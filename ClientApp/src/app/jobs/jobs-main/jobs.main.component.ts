import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-jobs.main",
  templateUrl: "./jobs.main.component.html",
  styleUrls: ["./jobs.main.component.scss"],
})
export class JobsMainComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle("Service Provider | Jobs");
  }
}
