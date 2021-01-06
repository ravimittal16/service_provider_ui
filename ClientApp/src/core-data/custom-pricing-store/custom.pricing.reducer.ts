import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { IndividualPricingDto } from "@shared/service-proxies/service-proxies";
import {
  CustomPricingStoreState,
  IndividualPricingState,
} from "./custom.pricing.state";
import * as fromAllActions from "./custom.pricing.actions";
import { Action, createReducer, on } from "@ngrx/store";

export const customPricingStoreFeatureKey = "custom-pricing";

export function selectIndividualPricingId(a: IndividualPricingDto): string {
  return a.pricingId.toString();
}

export const individualPricingAdapter: EntityAdapter<IndividualPricingDto> = createEntityAdapter<IndividualPricingDto>(
  {
    selectId: selectIndividualPricingId,
  }
);

const individualPricingInitialState: IndividualPricingState = individualPricingAdapter.getInitialState(
  {
    modalRef: null,
    isBusy: false,
    items: [],
    success: false,
    errors: [],
    actionReturnCode: null,
  }
);

export const initialState: CustomPricingStoreState = {
  isBusy: false,
  errors: [],
  isSuccess: false,
  individualPricingState: individualPricingInitialState,
};

const createFeatureReducer = createReducer(
  initialState,
  on(
    fromAllActions.addUpdateIndividualPricingCompletedAction,
    (state, props) => {
      let __individualPricingState = state.individualPricingState;
      if (props.success) {
        if (props.isFromAdd) {
          __individualPricingState = individualPricingAdapter.addOne(
            props.entity,
            __individualPricingState
          );
        }
      }
      return {
        ...state,
        isBusy: false,
        individualPricingState: __individualPricingState,
      };
    }
  ),
  on(
    fromAllActions.onFetchAllIndividualPricingListCompletedAction,
    (state, props) => {
      let __individualPricingState = state.individualPricingState;
      __individualPricingState = individualPricingAdapter.addMany(
        props.list,
        __individualPricingState
      );
      return {
        ...state,
        individualPricingState: __individualPricingState,
        isBusy: false,
      };
    }
  )
);
export function reducer(
  state: CustomPricingStoreState | undefined,
  action: Action
) {
  return createFeatureReducer(state, action);
}
