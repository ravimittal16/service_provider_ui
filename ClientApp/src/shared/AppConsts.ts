export enum EntityTypes {
  CUSTOMER = 1,
  ADDRESS = 2,
}
export enum AddressTypes {
  SERVICE,
  BUSINESS = 1,
  ALTERNATIVESERVICE = 2,
  LEGAL = 3,
  OTHER = 4,
}
export enum EmployeeTypes {
  Owner, //SuperAdmin
  Administrator, //Administrator
  Manager, //Manager
  LimitedContractor, //LimitedContractor
  Contractor, //Contractor
  Dispatcher, //Dispatcher
  Employee, //Employee,
  Customer, //ExternalUser
}
export class AppConsts {
  static remoteServiceBaseUrl: string = "http://localhost:2158";
  static appBaseUrl: string = "app/home";
  static appBaseHref: string = "/"; // returns angular's base-href parameter value if used during the publish

  static localeMappings: any = [];

  static readonly userManagement = {
    defaultAdminUserName: "admin",
  };

  static readonly appSettings = {
    displayName: "Service Provider",
  };

  static readonly localization = {
    defaultLocalizationSourceName: "Service Provider",
  };

  static readonly authorization = {
    encryptedAuthTokenName: "enc_auth_token",
  };
}
