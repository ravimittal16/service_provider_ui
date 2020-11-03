import { Injectable } from "@angular/core";

export interface IToast {
  header: string;
  title: string;
  classname?: string;
  delay?: number;
}

@Injectable()
export class ToastService {
  toasts: IToast[] = [];
  constructor() {}

  private show(toast: IToast, options: any = {}) {
    this.toasts.push(toast);
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  alert(): any {}
  warning(): any {}
  showError(heading: string, title: string): any {
    const __toast: IToast = {
      header: heading,
      title,
      classname: "bg-danger text-light",
      delay: 15000,
    };
    this.show(__toast);
  }
  showSuccess(heading: string, title: string): any {
    const __toast: IToast = {
      header: heading,
      title,
      classname: "bg-success text-light",
      delay: 10000,
    };
    this.show(__toast);
  }
}
