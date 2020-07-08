import { Component, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit {
  gridOptions: GridOptions;
  users$: Observable<any[]>;
  constructor() {}

  addNewUserClicked(): void {}

  ngOnInit(): void {}
}
