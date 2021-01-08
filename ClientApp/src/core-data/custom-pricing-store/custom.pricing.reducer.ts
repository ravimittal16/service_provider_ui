import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import {
  IndividualPricingDto,
  PricingGroupDto,
} from "@shared/service-proxies/service-proxies";
import {
  CustomPricingStoreState,
  GroupPricingState,
  IndividualPricingState,
} from "./custom.pricing.state";
import * as fromAllActions from "./custom.pricing.actions";
import { Action, createReducer, on } from "@ngrx/store";

export const customPricingStoreFeatureKey = "custom-pricing";

// ==========================================================
// INDIVIDUAL PRICING
// ==========================================================

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

// ==========================================================
// GROUP PRICING
// ==========================================================

export function selectGroupPricingId(a: PricingGroupDto): string {
  return a.pricingGroupId.toString();
}

export const groupPricingAdapter: EntityAdapter<PricingGroupDto> = createEntityAdapter<PricingGroupDto>(
  {
    selectId: selectGroupPricingId,
  }
);

const groupPricingInitialState: GroupPricingState = groupPricingAdapter.getInitialState(
  {
    modalRef: null,
    errors: [],
    isBusy: false,
    success: false,
    actionReturnCode: null,
    items: [],
  }
);

export const initialState: CustomPricingStoreState = {
  isBusy: false,
  errors: [],
  isSuccess: false,
  individualPricingState: individualPricingInitialState,
  groupPricingState: groupPricingInitialState,
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
  ),
  on(fromAllActions.addUpdatePricingGrpupCompletedAction, (state, props) => {
    let __groupPricingState = state.groupPricingState;
    if (props.success) {
      if (props.isFromAdd) {
        __groupPricingState = groupPricingAdapter.addOne(
          props.entity,
          __groupPricingState
        );
      }
    }
    return {
      ...state,
      isBusy: false,
      groupPricingState: __groupPricingState,
    };
  }),
  on(fromAllActions.fetchAllPricingGroupCompletedAction, (state, props) => {
    let __groupPricingState = state.groupPricingState;
    __groupPricingState = groupPricingAdapter.addMany(
      props.groups,
      __groupPricingState
    );
    return {
      ...state,
      groupPricingState: __groupPricingState,
      isBusy: false,
    };
  })
);
export function reducer(
  state: CustomPricingStoreState | undefined,
  action: Action
) {
  return createFeatureReducer(state, action);
}
