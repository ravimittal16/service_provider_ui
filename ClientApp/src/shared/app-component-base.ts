import { Injector, ElementRef } from "@angular/core";
import { AppConsts } from "@shared/AppConsts";

export abstract class AppComponentBase {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  elementRef: ElementRef;

  constructor(injector: Injector) {
    this.elementRef = injector.get(ElementRef);
  }

  l(key: string, ...args: any[]): string {
    // let localizedText = this.localization.localize(
    //   key,
    //   this.localizationSourceName
    // );

    // if (!localizedText) {
    //   localizedText = key;
    // }

    // if (!args || !args.length) {
    //   return localizedText;
    // }

    // args.unshift(localizedText);
    // return abp.utils.formatString.apply(this, args);
    return key;
  }

  // isGranted(permissionName: string): boolean {
  //   return this.permission.isGranted(permissionName);
  // }
}
