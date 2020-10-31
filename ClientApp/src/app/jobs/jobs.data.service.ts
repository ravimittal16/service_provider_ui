import { Injectable } from "@angular/core";

import {
  CreateJobModel,
  CreateJobModelGenericResponse,
  JobsServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class JobsDataService {
  constructor(private _jobServiceProxy: JobsServiceProxy) {}

  createJob(model: CreateJobModel): Observable<CreateJobModelGenericResponse> {
    return this._jobServiceProxy.createJob(model);
  }
}
