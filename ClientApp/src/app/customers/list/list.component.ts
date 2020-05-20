import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
} from "@angular/core";
import {
  NgbModal,
  NgbCalendar,
  NgbDatepicker,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  closeResult = "";
  rowData: [] = [];
  constructor(private modalService: NgbModal, private calendar: NgbCalendar) {}
  columnDefs = [
    {
      headerName: "Display Name",
      field: "make",
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: "Company Name",
      field: "model",
      sortable: true,
      filter: true,
    },
    { headerName: "Given Name", field: "price", sortable: true, filter: true },
    { headerName: "Given Name", field: "price", sortable: true, filter: true },
    {
      headerName: "Business Address Name",
      field: "price",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Customer Since",
      field: "price",
      sortable: true,
      filter: true,
    },
  ];

  open(content): void {}
  ngOnInit(): void {}
}
