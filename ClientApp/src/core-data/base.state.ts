import { EntityState, Dictionary } from "@ngrx/entity";
import { ActionReturnCode } from "@shared/service-proxies/service-proxies";

export class BaseState<TEntity> implements EntityState<TEntity> {
  ids: string[] | number[];
  entities: Dictionary<TEntity>;
  isBusy: boolean;
  errors: string[];
  success: boolean;
  items: TEntity[];
  actionReturnCode?: ActionReturnCode;
}
