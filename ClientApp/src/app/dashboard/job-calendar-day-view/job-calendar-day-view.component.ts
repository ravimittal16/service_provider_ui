import { Component, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { Calendar, CalendarOptions } from "@fullcalendar/core";

@Component({
  selector: "app-job-calendar-day-view",
  templateUrl: "./job-calendar-day-view.component.html",
  styleUrls: ["./job-calendar-day-view.component.scss"],
})
export class JobCalendarDayViewComponent implements OnInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  calendarApi: Calendar;
  calendarOptions: CalendarOptions = {
    initialView: "listDay",
    headerToolbar: {
      left: "title",
    },
    noEventsContent: "Nothing scaheduled for today.",
    views: {
      listDay: { buttonText: "Agenda Day" },
    },
    weekends: true,
    dayMaxEvents: 2,
    height: "800px",
    dateClick: (params) => {
      console.log(params);
    },
  };
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.calendarOptions.height = window.outerHeight - 210 + "px";
    }, 100);
  }
}
