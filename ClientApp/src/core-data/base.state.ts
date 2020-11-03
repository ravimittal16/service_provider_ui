import { EntityState, Dictionary } from "@ngrx/entity";

export class BaseState<TEntity> implements EntityState<TEntity> {
  ids: string[] | number[];
  entities: Dictionary<TEntity>;
  isBusy: boolean;
  errors: string[];
  success: boolean;
  items: TEntity[];
}
