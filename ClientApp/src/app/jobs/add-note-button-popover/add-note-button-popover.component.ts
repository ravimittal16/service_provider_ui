import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JobsFacade } from "@core-data/index";
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { isEmpty } from "lodash";

@Component({
  selector: "app-add-note-button-popover",
  templateUrl: "./add-note-button-popover.component.html",
  styleUrls: ["./add-note-button-popover.component.scss"],
})
export class AddNoteButtonPopoverComponent implements OnInit {
  @Input() jobId: number;
  @Input() visitId: number;
  content: string;
  private __popover: NgbPopover;
  isBusy = false;
  constructor(private _fb: FormBuilder, private _jobsFacade: JobsFacade) {}

  addNoteClicked(addNotePopover: NgbPopover, $event: MouseEvent): void {
    this.__popover = addNotePopover;
    addNotePopover.open();
    setTimeout(() => {
      const _inputEl = document.getElementById("contentInput");
      if (_inputEl) {
        _inputEl.focus();
      }
    }, 100);
    $event.stopPropagation();
  }

  closePopover(): void {
    this._closePopover();
  }

  private _closePopover() {
    this.isBusy = false;
    this.content = "";
    this.__popover.close();
  }

  saveNoteClicked(): void {
    this.isBusy = false;
    if (!isEmpty(this.content)) {
      this.isBusy = true;
      this._jobsFacade.addNewJobNote(this.content, this.jobId, this.visitId);
      setTimeout(() => {
        this._closePopover();
      }, 100);
    }
  }

  ngOnInit(): void {
    this.isBusy = false;
  }
}
