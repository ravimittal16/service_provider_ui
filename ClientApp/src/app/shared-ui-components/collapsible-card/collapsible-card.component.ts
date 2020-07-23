import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Renderer2,
  ViewContainerRef,
} from "@angular/core";
import { Guid } from "guid-typescript";
import { CollapseOption, CollapseEvent } from "bootstrap";

@Component({
  selector: "app-collapsible-card",
  templateUrl: "./collapsible-card.component.html",
  styleUrls: ["./collapsible-card.component.scss"],
})
export class CollapsibleCardComponent implements OnInit, AfterViewInit {
  @Input() expandOnLoad = false;
  private _isExpanded = false;
  id: string;

  constructor(
    private renderer: Renderer2,
    private elementRef: ViewContainerRef
  ) {}
  ngAfterViewInit(): void {
    if (this.expandOnLoad) {
      this.expandCollapsePanel();
    } else {
      const $cardHeader = document.getElementById(`header-${this.id}`);
      this.renderer.addClass($cardHeader, "header-collapsed");
    }
  }

  get isExpanded() {
    return this._isExpanded;
  }

  expandCollapsePanel() {
    const $contentContainer = document.getElementById(`collapse-${this.id}`);
    const $cardHeader = document.getElementById(`header-${this.id}`);
    // ==========================================================
    // Bootstrap : https://getbootstrap.com/docs/4.5/components/collapse/
    // ==========================================================
    // $contentContainer.collapse();
    this._isExpanded = !this._isExpanded;
    if (this._isExpanded) {
      this.renderer.removeClass($cardHeader, "header-collapsed");
    } else {
      this.renderer.addClass($cardHeader, "header-collapsed");
    }
    jQuery($contentContainer).collapse("toggle");
  }

  ngOnInit(): void {
    this.id = Guid.create().toString();
  }
}
