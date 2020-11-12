import { ProductDto } from "@shared/service-proxies/service-proxies";
import { EntityState } from "@ngrx/entity";

export interface IFilteredProducts {
  [key: string]: ProductDto[];
}
export interface ProductsState extends EntityState<ProductDto> {
  isBusy: boolean;
  errors: string[];
  companyId: number;
  success: boolean;
  // ==========================================================
  // From product selection modal
  // ==========================================================
  selectedGroupFromModal: any;
  filteredProducts: IFilteredProducts;
}
