// Importaciones necesarias para componentes y plugins
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { Modal } from 'bootstrap';

// Decorador que define el componente Angular
@Component({
  selector: 'app-calendario', // Etiqueta para usar el componente en HTML
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, OnDestroy {
  // Instancias del calendario y modales de Bootstrap
  calendar!: Calendar;
  modal!: Modal;
  deleteModal!: Modal;

  // Evento actualmente seleccionado para editar o eliminar
  selectedEvent: any = null;

  // Datos del formulario del evento
  eventTitle = '';
  eventDate = '';
  eventDescription = '';
  eventPriority = 'media';

  private resizeTimeout: any;

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.initCalendar();
    this.deleteModal = new Modal(document.getElementById('confirmDeleteModal')!);
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  // Método que se ejecuta al destruir el componente
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    clearTimeout(this.resizeTimeout);
  }

  // Maneja el redimensionamiento de la ventana
  private handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.calendar) {
        this.calendar.updateSize();
      }
    }, 300);
  }

  // Inicializa el calendario con configuraciones y eventos
  initCalendar() {
    const calendarEl = document.getElementById('calendar');

    this.calendar = new Calendar(calendarEl!, {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
      themeSystem: 'bootstrap5',
      initialView: 'dayGridMonth',
      locale: 'es',
      timeZone: 'America/Lima',
      firstDay: 1,
      contentHeight: 'auto',
      aspectRatio: 1.5,       
      handleWindowResize: true,
      expandRows: true,
      titleFormat: {
        year: 'numeric',
        month: 'long'
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek'
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
      },
      events: this.getEventsFromStorage(),
      eventDisplay: 'auto',
      eventClassNames: (arg) => [`fc-event-priority-${arg.event.extendedProps.priority}`],
      eventClick: this.handleEventClick.bind(this),
      dateClick: this.handleDateClick.bind(this),
      windowResize: () => {
        if (this.calendar) {
          this.calendar.updateSize();
        }
      }
      
    });
    

    this.calendar.render();
    this.modal = new Modal(document.getElementById('eventModal')!);
    
    // Fuerza un cálculo inicial del tamaño
    setTimeout(() => this.calendar.updateSize(), 0);
  }

  // Resto de métodos se mantienen igual...
  getEventsFromStorage(): EventInput[] {
    const storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
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

    this.saveEventsToStorage(
      this.calendar.getEvents().map(e => ({
        id: e.id,
        title: e.title,
        start: e.startStr,
        extendedProps: e.extendedProps
      }))
    );

    this.modal.hide();
    this.resetForm();
  }

  handleDeleteEvent() {
    if (this.selectedEvent) {
      this.modal.hide();
      this.deleteModal.show();
    }
  }

  confirmDelete() {
    this.selectedEvent.remove();
    const updatedEvents = this.calendar.getEvents().map(e => ({
      id: e.id,
      title: e.title,
      start: e.startStr,
      extendedProps: e.extendedProps
    }));
    this.saveEventsToStorage(updatedEvents);
    this.deleteModal.hide();
    this.resetForm();
  }

  resetForm() {
    this.eventTitle = '';
    this.eventDate = '';
    this.eventDescription = '';
    this.eventPriority = 'media';
  }
}