import { EntityState } from "@ngrx/entity";
import {
  AuthenticateResultModel,
  AuthenticateModel,
} from "@shared/service-proxies/service-proxies";

export interface LoginState {
  response: AuthenticateResultModel;
  isRunning: boolean;
  loginModel: AuthenticateModel;
  isAuthenticated: boolean;
  accessToken: string;
  error: string;
  userId: "";
}
