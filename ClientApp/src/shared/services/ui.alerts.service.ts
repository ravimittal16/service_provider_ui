export class UiAlerts {
  constructor() {}
  confirm(
    title: string,
    heading: string = "Confirmation",
    subTitle?: string
  ): any {}
  alert(): any {}
  warning(): any {}
  showError(): any {}
  showSuccess(): any {}
}
