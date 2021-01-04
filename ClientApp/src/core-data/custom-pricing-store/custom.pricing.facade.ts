import { Injectable } from "@angular/core";
import { Facade } from "@core-data/iFacade";
import { Action } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class CustomPricingFacade implements Facade {
  dispatch(action: Action) {
    throw new Error("Method not implemented.");
  }
}
