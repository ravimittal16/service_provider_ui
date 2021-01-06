import { Injectable } from "@angular/core";
import { Facade } from "@core-data/iFacade";
import { Action, select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CustomPricingStoreState } from "./custom.pricing.state";
import * as fromAllActions from "./custom.pricing.actions";
import * as fromAllSelectors from "./custom.pricing.selectors";
import {
  IndividualPricingDto,
  IndividualPricingModel,
} from "@shared/service-proxies/service-proxies";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class CustomPricingFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  individualPricingList$: Observable<IndividualPricingDto[]>;
  constructor(private _store: Store<CustomPricingStoreState>) {
    this.individualPricingList$ = this._store.pipe(
      select(fromAllSelectors.selectAllIndividualPricingList)
    );
  }

  private _setBusy(isBusy: boolean) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: isBusy }));
  }

  addUpdateIndividualPricing(
    model: IndividualPricingModel,
    modal: NgbActiveModal
  ) {
    this._setBusy(true);
    this.dispatch(
      fromAllActions.addUpdateIndividualPricing({ model: model, modal: modal })
    );
  }

  fetchAllIndividualPricing() {
    this._setBusy(true);
    this.dispatch(fromAllActions.fetchAllIndividualPricingListAction());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
