import { Weekdays } from "./service-proxies/service-proxies";

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
export enum WEEKDAYS {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}
export class AppConsts {
  static remoteServiceBaseUrl: string = "http://localhost:2159";
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

  static readonly WeekDays = [
    { dayName: "Sunday", dayCode: WEEKDAYS.SUNDAY },
    { dayName: "Monday", dayCode: WEEKDAYS.MONDAY },
    { dayName: "Tuesday", dayCode: WEEKDAYS.TUESDAY },
    { dayName: "Wednesday", dayCode: WEEKDAYS.WEDNESDAY },
    { dayName: "Thursday", dayCode: WEEKDAYS.THURSDAY },
    { dayName: "Friday", dayCode: WEEKDAYS.FRIDAY },
    { dayName: "Saturday", dayCode: WEEKDAYS.SATURDAY },
  ];
}
