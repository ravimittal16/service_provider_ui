import { Injectable } from "@angular/core";

import {
  AddressDto,
  CreateJobModel,
  CreateJobModelGenericResponse,
  CustomersServiceProxy,
  JobsServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class JobsDataService {
  constructor(
    private __jobServiceProxy: JobsServiceProxy,
    private __customerServiceProxy: CustomersServiceProxy
  ) {}

  getCustomerAddresses(customerId: number): Observable<AddressDto[]> {
    return this.__customerServiceProxy.getCustomerAddress(customerId);
  }

  createJob(model: CreateJobModel): Observable<CreateJobModelGenericResponse> {
    return this.__jobServiceProxy.createJob(model);
  }
}
