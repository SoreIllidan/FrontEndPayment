// Importaciones necesarias para componentes y plugins
import { Component, OnInit } from '@angular/core';
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
export class CalendarioComponent implements OnInit {
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

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.initCalendar(); // Inicializa el calendario
    this.deleteModal = new Modal(document.getElementById('confirmDeleteModal')!); // Instancia del modal de confirmación
  }

  // Inicializa el calendario con configuraciones y eventos
  initCalendar() {
    const calendarEl = document.getElementById('calendar');

    this.calendar = new Calendar(calendarEl!, {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin], // Plugins usados
      themeSystem: 'bootstrap5',
      initialView: 'dayGridMonth',
      locale: 'es', // Idioma en español
      timeZone: 'America/Lima',
      firstDay: 1, // Lunes como primer día de la semana
      titleFormat: {
        year: 'numeric',
        month: 'long'
      },
      headerToolbar: {
        left: 'prev,next today', // Botones a la izquierda
        center: 'title',
        right: 'dayGridMonth,dayGridWeek' // Vistas disponibles
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
      },
      events: this.getEventsFromStorage(), // Eventos guardados en localStorage
      eventClassNames: (arg) => [`fc-event-priority-${arg.event.extendedProps.priority}`], // Clase según prioridad
      eventClick: this.handleEventClick.bind(this), // Maneja clic en evento
      dateClick: this.handleDateClick.bind(this) // Maneja clic en día vacío
    });

    this.calendar.render(); // Renderiza el calendario en pantalla
    this.modal = new Modal(document.getElementById('eventModal')!); // Instancia del modal de eventos
  }

  // Obtiene los eventos desde el localStorage
  getEventsFromStorage(): EventInput[] {
    const storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }

  // Guarda los eventos en localStorage
  saveEventsToStorage(events: EventInput[]) {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }

  // Abre el modal para crear un nuevo evento
  openNewEventModal() {
    this.selectedEvent = null;
    this.resetForm(); // Limpia formulario
    this.eventDate = this.calendar.getDate().toISOString().split('T')[0]; // Fecha seleccionada
    this.modal.show(); // Muestra el modal
  }

  // Maneja el clic sobre una fecha vacía
  handleDateClick(info: any) {
    this.eventDate = info.dateStr; // Asigna la fecha
    this.openNewEventModal(); // Abre el modal para crear evento
  }

  // Maneja el clic sobre un evento existente
  handleEventClick(info: any) {
    this.selectedEvent = info.event; // Guarda evento seleccionado
    this.eventTitle = this.selectedEvent.title;
    this.eventDate = this.selectedEvent.startStr;
    this.eventDescription = this.selectedEvent.extendedProps.description;
    this.eventPriority = this.selectedEvent.extendedProps.priority;
    this.modal.show(); // Abre modal con datos precargados
  }

  // Crea o actualiza un evento
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
      eventData.id = this.selectedEvent.id; // Mantiene ID si es edición
      this.selectedEvent.remove(); // Elimina evento anterior
    }

    this.calendar.addEvent(eventData); // Agrega nuevo evento

    // Guarda todos los eventos en localStorage
    this.saveEventsToStorage(
      this.calendar.getEvents().map(e => ({
        id: e.id,
        title: e.title,
        start: e.startStr,
        extendedProps: e.extendedProps
      }))
    );

    this.modal.hide(); // Cierra modal
    this.resetForm(); // Limpia formulario
  }

  // Solicita confirmación para eliminar evento
  handleDeleteEvent() {
    if (this.selectedEvent) {
      this.modal.hide(); // Cierra modal de evento
      this.deleteModal.show(); // Abre modal de confirmación
    }
  }

  // Confirma y elimina el evento seleccionado
  confirmDelete() {
    this.selectedEvent.remove(); // Elimina evento del calendario

    // Guarda eventos actualizados
    const updatedEvents = this.calendar.getEvents().map(e => ({
      id: e.id,
      title: e.title,
      start: e.startStr,
      extendedProps: e.extendedProps
    }));
    this.saveEventsToStorage(updatedEvents);

    this.deleteModal.hide(); // Cierra modal de confirmación
    this.resetForm(); // Limpia formulario
  }

  // Limpia campos del formulario
  resetForm() {
    this.eventTitle = '';
    this.eventDate = '';
    this.eventDescription = '';
    this.eventPriority = 'media';
  }
}
