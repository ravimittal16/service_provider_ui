import {
  RouterReducerState,
  RouterStateSerializer,
  routerReducer,
} from "@ngrx/router-store";
import {
  ActivatedRouteSnapshot,
  Data,
  Params,
  RouterStateSnapshot,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  data?: Data;
}

export type MergedRouteReducerState = RouterReducerState<RouterStateUrl>;

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const getRouterState = createFeatureSelector<MergedRouteReducerState>(
  "routerReducer"
);

// export const getRouterState = createSelector(
//   (state: State) => state.router,
//   (value) => value
// );

@Injectable()
export class CustomStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {
      url,
      root: { queryParams },
    } = routerState;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params };
  }
}
