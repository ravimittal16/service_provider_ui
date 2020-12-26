import { Component, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { CalendarOptions } from "@fullcalendar/core";

@Component({
  selector: "app-jobs-calendar-view",
  templateUrl: "./jobs-calendar-view.component.html",
  styleUrls: ["./jobs-calendar-view.component.scss"],
})
export class JobsCalendarViewComponent implements OnInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay,dayGridMonth,listMonth,listWeek",
    },
    weekends: false,
    views: {
      timeGridDay: { buttonText: "Day" },
      timeGridWeek: { buttonText: "Work week" },
      dayGridMonth: { buttonText: "Month" },
      listWeek: { buttonText: "Agenda Week" },
      listMonth: { buttonText: "Agenda Month" },
    },
    dayMaxEvents: 2,
    height: "100%",

    dateClick: (params) => {
      console.log(params);
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
