import { Component, OnInit } from "@angular/core";
import { Guid } from "guid-typescript";
import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

@Component({
  selector: "app-collapsible-card",
  templateUrl: "./collapsible-card.component.html",
  styleUrls: ["./collapsible-card.component.scss"],
})
export class CollapsibleCardComponent implements OnInit {
  id: string;
  constructor() {}

  ngOnInit(): void {
    this.id = Guid.create().toString();
    console.log(this.id);
  }
}
