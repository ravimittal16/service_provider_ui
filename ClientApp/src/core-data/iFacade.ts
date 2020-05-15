import { Action } from "@ngrx/store";

export interface Facade {
  dispatch(action: Action);
}
