import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerDto } from "@shared/service-proxies/service-proxies";
import { SharedDataService } from "../shared.data.service";

@Component({
  selector: "app-customer-selector-modal",
  templateUrl: "./customer-selector-modal.component.html",
  styleUrls: ["./customer-selector-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSelectorModalComponent implements OnInit {
  groups: { groupName: string; checked?: boolean }[] = [];
  @Input() selectionCallback: (product: CustomerDto) => void;
  constructor(
    public activeModal: NgbActiveModal,
    private _sharedDateService: SharedDataService
  ) {}

  onSelectionChanged(grp: any): void {}

  ngOnInit(): void {
    this.groups = this._sharedDateService.filterButtonsGroup;
  }
}
