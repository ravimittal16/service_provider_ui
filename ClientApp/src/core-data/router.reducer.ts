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
import { createFeatureSelector } from "@ngrx/store";

export interface MergedRoute {
  url: string;
  queryParams: Params;
  params: Params;
  data?: Data;
}

export type MergedRouteReducerState = RouterReducerState<MergedRoute>;

export const getRouterState = createFeatureSelector<MergedRouteReducerState>(
  "router"
);

@Injectable()
export class CustomStateSerializer
  implements RouterStateSerializer<MergedRoute> {
  serialize(routerState: RouterStateSnapshot): MergedRoute {
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
