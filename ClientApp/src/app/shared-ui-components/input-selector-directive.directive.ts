import { Directive, OnInit, ElementRef, Input } from "@angular/core";
import Choices from "choices.js";

@Directive({
  selector: "select[choices]",
})
export class InputSelectorDirectiveDirective implements OnInit {
  private __maxIntervalCheckCount = 30;
  @Input() isObservableList: boolean = false;
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    let __counter = 1;
    if (this.el) {
      const __interval = setInterval(() => {
        const __length = (this.el.nativeElement as HTMLSelectElement).options
          .length;
        if (__length > 1 || __counter >= this.__maxIntervalCheckCount) {
          if (__length > 1) {
            const __cho = new Choices(this.el.nativeElement, {
              placeholder: true,
              removeItemButton: false,
            });
          }
          clearInterval(__interval);
        }
        __counter += 1;
      }, 100);
    }
  }
}
