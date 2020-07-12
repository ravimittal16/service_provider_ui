import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.state";
import { usersFeatureKey, adapter } from "./users.redurcers";

export const usersFeatureState = createFeatureSelector<UsersState>(
  usersFeatureKey
);

// ==========================================================
// User Adapter Selectors
// ==========================================================

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectUserIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = createSelector(usersFeatureState, selectAll);
export const usersBusyStateSelector = createSelector(
  usersFeatureState,
  (s) => s.isBusy
);

export const selectErrors = createSelector(usersFeatureState, (s) => s.errors);
