export class AppConsts {
  static remoteServiceBaseUrl: string = "http://localhost:21021";
  static appBaseUrl: string;
  static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

  static localeMappings: any = [];

  static readonly userManagement = {
    defaultAdminUserName: "admin"
  };

  static readonly appSettings = {
    displayName: "Network"
  };

  static readonly localization = {
    defaultLocalizationSourceName: "Network"
  };

  static readonly authorization = {
    encryptedAuthTokenName: "enc_auth_token"
  };
}
