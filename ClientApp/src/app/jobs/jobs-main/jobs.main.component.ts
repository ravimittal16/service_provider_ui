import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { JobDto } from "@shared/service-proxies/service-proxies";

import { SubSink } from "subsink";
import { JobsModalService } from "../jobs.modal.service";

@Component({
  selector: "app-jobs.main",
  templateUrl: "./jobs.main.component.html",
  styleUrls: ["./jobs.main.component.scss"],
})
export class JobsMainComponent implements OnInit, OnDestroy {
  private _sub = new SubSink();
  private _backdropEl: HTMLDivElement;
  selectedJob: JobDto;
  constructor(
    private title: Title,
    private _renderer: Renderer2,
    private _jobModalService: JobsModalService
  ) {}
  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  hideModal() {
    const _modelEl = document.getElementById("exampleModalRight");
    if (this._backdropEl) {
      this._renderer.removeChild(document.body, this._backdropEl);
    }
    this._renderer.removeAttribute(_modelEl, "aria-modal");
    this._renderer.removeAttribute(_modelEl, "role");
    this._renderer.setStyle(_modelEl, "display", "none");
    this._renderer.removeClass(_modelEl, "show");
  }

  private _showModal() {
    const _modelEl = document.getElementById("exampleModalRight");
    this._backdropEl = this._renderer.createElement("div");
    this._renderer.addClass(this._backdropEl, "modal-backdrop");
    this._renderer.addClass(this._backdropEl, "fade");
    this._renderer.addClass(this._backdropEl, "show");

    this._renderer.appendChild(document.body, this._backdropEl);
    setTimeout(() => {
      this._renderer.listen(_modelEl, "click", (event) => {
        this.hideModal();
      });
      this._renderer.removeAttribute(_modelEl, "aria-hidden");
      this._renderer.setStyle(_modelEl, "display", "block");
      this._renderer.setStyle(_modelEl, "padding-right", "17px");
      this._renderer.addClass(_modelEl, "show");
      this._renderer.setAttribute(_modelEl, "aria-modal", "true");
      this._renderer.setAttribute(_modelEl, "role", "dialog");
    });
  }

  ngOnInit(): void {
    this.title.setTitle("Service Provider | Jobs");
    this._sub.add(
      this._jobModalService.jobVerticalModalBehaviour$.subscribe((details) => {
        if (details && details.jobDto && details.open) {
          this.selectedJob = details.jobDto;
          this._showModal();
        }
      })
    );
  }
}
