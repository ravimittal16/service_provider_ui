import { EntityState, Dictionary } from "@ngrx/entity";

export class BaseState<TEntity> implements EntityState<TEntity> {
  ids: string[] | number[];
  entities: Dictionary<TEntity>;
}
