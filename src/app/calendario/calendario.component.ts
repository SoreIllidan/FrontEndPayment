import { Component, OnInit } from '@angular/core';
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  calendar!: Calendar;
  modal!: Modal;
  selectedEvent: any = null;
  
  // Form fields
  eventTitle = '';
  eventDate = '';
  eventDescription = '';
  eventPriority = 'media';

  ngOnInit(): void {
    this.initCalendar();
  }

  initCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    this.calendar = new Calendar(calendarEl!, {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
      themeSystem: 'bootstrap5',
      initialView: 'dayGridMonth',
      locale: 'es',
      timeZone: 'America/Lima',
      firstDay: 1,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día'
      },
      events: this.getEventsFromStorage(),
      eventClassNames: (arg) => [`fc-event-priority-${arg.event.extendedProps.priority}`],
      eventClick: this.handleEventClick.bind(this)
    });

    this.calendar.render();
    this.modal = new Modal(document.getElementById('eventModal')!);
  }

  getEventsFromStorage(): EventInput[] {
    return JSON.parse(localStorage.getItem('calendarEvents') || '[]');
  }

  saveEventsToStorage(events: EventInput[]) {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }

  openNewEventModal() {
    this.selectedEvent = null;
    this.resetForm();
    this.eventDate = this.calendar.getDate().toISOString().split('T')[0];
    this.modal.show();
  }

  handleDateClick(info: any) {
    this.eventDate = info.dateStr;
    this.openNewEventModal();
  }

  handleEventClick(info: any) {
    this.selectedEvent = info.event;
    this.eventTitle = this.selectedEvent.title;
    this.eventDate = this.selectedEvent.startStr;
    this.eventDescription = this.selectedEvent.extendedProps.description;
    this.eventPriority = this.selectedEvent.extendedProps.priority;
    this.modal.show();
  }

  handleEvent() {
    const eventData: EventInput = {
      title: this.eventTitle,
      start: this.eventDate,
      extendedProps: {
        description: this.eventDescription,
        priority: this.eventPriority
      }
    };

    if (this.selectedEvent) {
      eventData.id = this.selectedEvent.id;
      this.selectedEvent.remove();
    }

    this.calendar.addEvent(eventData);
    this.saveEventsToStorage(this.calendar.getEvents().map(e => ({
      id: e.id,
      title: e.title,
      start: e.startStr,
      extendedProps: e.extendedProps
    })));

    this.modal.hide();
    this.resetForm();
  }

  resetForm() {
    this.eventTitle = '';
    this.eventDate = '';
    this.eventDescription = '';
    this.eventPriority = 'media';
  }
}