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
  PricingGroupDetailDto,
  PricingGroupDto,
  PricingGroupModel,
} from "@shared/service-proxies/service-proxies";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class CustomPricingFacade implements Facade {
  errors$: Observable<string[]>;
  isBusy$: Observable<boolean>;
  individualPricingList$: Observable<IndividualPricingDto[]>;
  pricingGroupsList$: Observable<PricingGroupDto[]>;
  selectGroupDetails$: Observable<PricingGroupDetailDto>;
  constructor(private _store: Store<CustomPricingStoreState>) {
    this.individualPricingList$ = this._store.pipe(
      select(fromAllSelectors.selectAllIndividualPricingList)
    );

    this.pricingGroupsList$ = this._store.pipe(
      select(fromAllSelectors.selectAllPricingGroupsList)
    );
    this.selectGroupDetails$ = this._store.pipe(
      select(fromAllSelectors.selectGroupDetails)
    );
  }

  private _setBusy(isBusy: boolean) {
    this.dispatch(fromAllActions.uiStateBusyAction({ isBusy: isBusy }));
  }

  deleteProductFromPricing(pricingId: number, pricingGroupId: number) {
    this._setBusy(true);
    this.dispatch(
      fromAllActions.deleteProductFromPricingAction({
        pricingGroupId: pricingGroupId,
        pricingId: pricingId,
      })
    );
  }

  fetchGroupDetails(pricingGroupId: number) {
    this._setBusy(true);
    this.dispatch(
      fromAllActions.fetchPricingGroupDetailsAction({
        pricingGroupId: pricingGroupId,
      })
    );
  }

  addCustomerToPricingGroup(customerId: number, pricingGroupId: number) {
    this._setBusy(true);
    this.dispatch(
      fromAllActions.addUpdateCustomerToPricingGroupAction({
        customerId: customerId,
        pricingGroupId: pricingGroupId,
      })
    );
  }

  addUpdatePricingGroup(model: PricingGroupModel, modal: NgbActiveModal) {
    this._setBusy(true);
    this.dispatch(
      fromAllActions.addUpdatePricingGrpup({ model: model, modal: modal })
    );
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

  fetchAllPricingGrpups() {
    this._setBusy(true);
    this.dispatch(fromAllActions.fetchAllPricingGrpupsAction());
  }

  fetchAllIndividualPricing() {
    this._setBusy(true);
    this.dispatch(fromAllActions.fetchAllIndividualPricingListAction());
  }

  dispatch(action: Action) {
    this._store.dispatch(action);
  }
}
