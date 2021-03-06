import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import {
  IndividualPricingDto,
  PricingGroupDetailDto,
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
    selectGroupId: 0,
    selecteGroupDetails: null,
  }
);

export const initialState: CustomPricingStoreState = {
  isBusy: false,
  errors: [],
  isSuccess: false,
  individualPricingState: individualPricingInitialState,
  groupPricingState: groupPricingInitialState,
  actionReturnCode: null,
};

const createFeatureReducer = createReducer(
  initialState,
  on(fromAllActions.updateErrorStateAction, (state, props) => {
    return {
      ...state,
      isBusy: false,
      errors: props.errors,
    };
  }),
  on(
    fromAllActions.addUpdateIndividualPricingCompletedAction,
    (state, props) => {
      let __individualPricingState = state.individualPricingState;
      let __groupPricingState = state.groupPricingState;
      if (props.success) {
        if (props.isFromAdd) {
          if (!props.forGroupPricing) {
            __individualPricingState = individualPricingAdapter.addOne(
              props.entity,
              __individualPricingState
            );
          } else {
            // ==========================================================
            // GROUP PRICING
            // ==========================================================
            const _selectedGroupDetails = {
              ...__groupPricingState.selecteGroupDetails,
            } as PricingGroupDetailDto;
            const __groupProducts = [
              ...__groupPricingState.selecteGroupDetails.products,
              props.entity,
            ];
            _selectedGroupDetails.products = __groupProducts;
            __groupPricingState = {
              ...__groupPricingState,
              selecteGroupDetails: _selectedGroupDetails,
            };
          }
        }
      }
      return {
        ...state,
        isBusy: false,
        groupPricingState: __groupPricingState,
        individualPricingState: __individualPricingState,
      };
    }
  ),
  on(
    fromAllActions.addUpdateCustomerToPricingGroupCompletedAction,
    (state, props) => {
      let __groupPricingState = state.groupPricingState;
      if (props.isSuccess && props.response.entity) {
        const _selectedGroupDetails = {
          ...__groupPricingState.selecteGroupDetails,
        } as PricingGroupDetailDto;
        const __groupCustomers = [
          ...__groupPricingState.selecteGroupDetails.customers,
          props.response.entity,
        ];
        _selectedGroupDetails.customers = __groupCustomers;
        __groupPricingState = {
          ...__groupPricingState,
          selecteGroupDetails: _selectedGroupDetails,
        };
      }
      return {
        ...state,
        errors: [],
        groupPricingState: __groupPricingState,
        isBusy: false,
      };
    }
  ),
  on(
    fromAllActions.deleteCustomerFromPricingGroupCompletedAction,
    (state, props) => {
      let __groupPricingState = state.groupPricingState;
      let actionReturnCode = null;
      if (props.isSuccess) {
        const __customers = __groupPricingState.selecteGroupDetails.customers.filter(
          (x) =>
            x.pricingGroupId === props.pricingGroupId &&
            x.customerId !== props.customerId
        );

        const _selectedGroupDetails = {
          ...__groupPricingState.selecteGroupDetails,
        } as PricingGroupDetailDto;
        _selectedGroupDetails.customers = __customers;
        __groupPricingState = {
          ...__groupPricingState,
          selecteGroupDetails: _selectedGroupDetails,
        };
      } else {
        actionReturnCode = props.actionReturnCode;
      }
      return {
        ...state,
        errors: [],
        actionReturnCode: actionReturnCode,
        groupPricingState: __groupPricingState,
        isBusy: false,
      };
    }
  ),
  on(fromAllActions.deleteProductFromPricingCompletedAction, (state, props) => {
    let __individualPricingState = state.individualPricingState;
    let __groupPricingState = state.groupPricingState;
    let actionReturnCode = null;
    if (props.isSuccess) {
      if (props.forGroupPricing) {
        const __items = __groupPricingState.selecteGroupDetails.products.filter(
          (x) => x.pricingId !== props.pricingId
        );
        const _selectedGroupDetails = {
          ...__groupPricingState.selecteGroupDetails,
        } as PricingGroupDetailDto;
        _selectedGroupDetails.products = __items;
        __groupPricingState = {
          ...__groupPricingState,
          selecteGroupDetails: _selectedGroupDetails,
        };
      } else {
        __individualPricingState = individualPricingAdapter.removeOne(
          props.pricingId,
          __individualPricingState
        );
      }
    } else {
      actionReturnCode = props.returnCode;
    }
    return {
      ...state,
      errors: [],
      actionReturnCode: actionReturnCode,
      groupPricingState: __groupPricingState,
      individualPricingState: __individualPricingState,
      isBusy: false,
    };
  }),
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
  }),
  on(fromAllActions.fetchPricingGroupDetailCompletedAction, (state, props) => {
    const __groupPricingState: GroupPricingState = {
      ...state.groupPricingState,
    };
    __groupPricingState.selecteGroupDetails = props.details;
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
