import { Facade } from "@core-data/iFacade";
import { Action } from "@ngrx/store";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CompanyFacade implements Facade {
  constructor() {}
  dispatch(action: Action) {}
}
