import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { RegisterModel } from "@shared/service-proxies/service-proxies";
import { RegsiterFacade } from "@core-data/index";

import { Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

@Component({
  templateUrl: "./register.component.html",
  animations: [accountModuleAnimation()],
  styleUrls: ["./register.component.less"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  model: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  externalSignupId: string;
  routeSub: Subscription;
  errors$: Observable<string[]>;
  uiState$: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _registerFacade: RegsiterFacade
  ) {
    this.errors$ = this._registerFacade.errors$;
    this.uiState$ = this._registerFacade.uiState$;
  }

  register(isValid): void {
    if (isValid) {
      const payload = this.registerForm.getRawValue() as RegisterModel;
      this._registerFacade.processRegister(payload);
    }
  }

  private _createRegisterForm(): void {
    this.registerForm = this._fb.group({
      fullName: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      companyName: ["", [Validators.required]],
      emailAddress: ["", [Validators.required, Validators.email]],
      phoneNumber: [""],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      privatePolicyCheck: [false],
      externalSignupId: [""],
    });
  }

  private patchValue(fieldName: string, value: any): void {
    const field = this.registerForm.get(fieldName);
    if (field) {
      console.log(value);
      field.setValue(value);
      field.disable();
    }
  }

  private _fetchSignupInformation() {
    this._registerFacade.fetchExternalSignupModel(this.externalSignupId);
  }

  private routeParamsForExternalSignup() {
    this.routeSub = this._route.queryParams
      // .pipe(finalize())
      .subscribe((params) => {
        this.externalSignupId = params["exsignup"] || "";
      });
  }

  bindExternalSignupProperties(model: RegisterModel) {
    this.patchValue("fullName", model.fullName);
    this.patchValue("companyName", model.companyName);
    this.patchValue("emailAddress", model.emailAddress);
    this.patchValue("phoneNumber", model.phoneNumber);
    this.patchValue("externalSignupId", model.externalSignupId);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeParamsForExternalSignup();
    this._createRegisterForm();
    setTimeout(() => {
      if (this.externalSignupId) {
        this._fetchSignupInformation();
        this._registerFacade.externalModel$.subscribe((payload) => {
          if (payload) {
            this.bindExternalSignupProperties(payload["model"]);
          }
        });
      }
    }, 100);
  }
}
