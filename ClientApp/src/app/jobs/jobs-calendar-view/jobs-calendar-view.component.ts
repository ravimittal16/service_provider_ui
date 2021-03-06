import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { Calendar, CalendarOptions } from "@fullcalendar/core";

@Component({
  selector: "app-jobs-calendar-view",
  templateUrl: "./jobs-calendar-view.component.html",
  styleUrls: ["./jobs-calendar-view.component.scss"],
})
export class JobsCalendarViewComponent implements OnInit, AfterViewInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  calendarApi: Calendar;
  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay,dayGridMonth,listMonth,listWeek,listDay",
    },
    weekends: false,
    views: {
      timeGridDay: { buttonText: "Day" },
      timeGridWeek: { buttonText: "Work week" },
      dayGridMonth: { buttonText: "Month" },
      listWeek: { buttonText: "Agenda Week" },
      listMonth: { buttonText: "Agenda Month" },
      listDay: { buttonText: "Agenda Day" },
    },
    dayMaxEvents: 2,
    height: "800px",

    dateClick: (params) => {
      console.log(params);
    },
  };
  constructor() {}
  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarOptions.height = window.outerHeight - 210 + "px";
  }

  ngOnInit(): void {}
}
