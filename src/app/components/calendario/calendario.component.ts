import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const calendarEl = document.getElementById('calendar');

    const calendar = new Calendar(calendarEl!, {
      plugins: [dayGridPlugin, bootstrap5Plugin],
      themeSystem: 'bootstrap5',
      initialView: 'dayGridMonth',
      events: [
        { title: 'Evento 1', date: '2025-04-28' },
        { title: 'Evento 2', date: '2025-04-29' }
      ]
    });

    calendar.render();
  }

}
