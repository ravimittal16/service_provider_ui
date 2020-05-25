import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { accountModuleAnimation } from "@shared/animations/routerTransition";
import { RegisterModel } from "@shared/service-proxies/service-proxies";
import { RegsiterFacade } from "@core-data/index";

import { Observable, Subscription } from "rxjs";

@Component({
  templateUrl: "./register.component.html",
  animations: [accountModuleAnimation()],
  styleUrls: ["./register.component.less"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  model: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  externalSignupId: String;
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
      const payload = this.registerForm.value as RegisterModel;
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
    });
  }

  private routeParamsForExternalSignup() {
    this.routeSub = this._route.queryParams.subscribe((params) => {
      this.externalSignupId = params["exsignup"] || "";
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this._createRegisterForm();
    this.routeParamsForExternalSignup();
  }
}
