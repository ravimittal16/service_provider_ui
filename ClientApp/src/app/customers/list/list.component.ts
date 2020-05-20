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
  @ViewChild(NgbDatepicker) d: NgbDatepicker;
  constructor(private modalService: NgbModal, private calendar: NgbCalendar) {}
  open(content): void {
    console.log(this.d);
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        keyboard: false,
        centered: true,
        backdrop: "static",
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `DIsmissed`;
        }
      );
  }
  ngOnInit(): void {}
}
