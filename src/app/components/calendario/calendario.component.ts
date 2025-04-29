// Importaciones básicas de Angular
import { Component, OnInit } from '@angular/core';

// Importaciones de FullCalendar y sus plugins
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';       // Plugin para vista de cuadrícula diaria
import interactionPlugin from '@fullcalendar/interaction'; // Plugin para interacciones
import bootstrap5Plugin from '@fullcalendar/bootstrap5';  // Integración con Bootstrap 5

// Importación de Bootstrap para manejar modales
import { Modal } from 'bootstrap';

// Decorador del componente Angular
@Component({
  selector: 'app-calendario',        // Selector para usar en plantillas HTML
  templateUrl: './calendario.component.html',  // Ruta de la plantilla HTML
  styleUrls: ['./calendario.component.css']    // Ruta de los estilos CSS
})
export class CalendarioComponent implements OnInit {
  // Instancia del calendario FullCalendar
  calendar!: Calendar;
  
  // Instancias de modales de Bootstrap
  modal!: Modal;          // Modal para crear/editar eventos
  deleteModal!: Modal;    // Modal para confirmar eliminación
  
  // Evento seleccionado para edición/eliminación
  selectedEvent: any = null;
  
  // Campos del formulario para eventos
  eventTitle = '';        // Título del evento
  eventDate = '';         // Fecha del evento
  eventDescription = '';  // Descripción del evento
  eventPriority = 'media'; // Prioridad del evento (valor por defecto)

  // Método del ciclo de vida: Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.initCalendar(); // Inicializa el calendario
    
    // Inicializa el modal de confirmación de eliminación
    this.deleteModal = new Modal(document.getElementById('confirmDeleteModal')!);
  }

  // Método para inicializar el calendario FullCalendar
  initCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    // Configuración principal de FullCalendar
    this.calendar = new Calendar(calendarEl!, {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin], // Plugins requeridos
      themeSystem: 'bootstrap5',     // Usa el tema de Bootstrap 5
      initialView: 'dayGridMonth',   // Vista inicial: mes
      locale: 'es',   //Idioma español 
      titleFormat: { 
        year: 'numeric', 
        month: 'long' 
      },
      timeZone: 'America/Lima',      // Zona horaria de Perú
      firstDay: 1,                   // La semana empieza en lunes
      
      // Configuración de la barra de herramientas
      headerToolbar: {
        left: 'prev,next today',     // Controles de navegación
        center: 'title',             // Título del mes/semana/día
        right: 'dayGridMonth,dayGridWeek' // Vistas disponibles
      },
      
      // Textos personalizados para los botones
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
      },
      
      events: this.getEventsFromStorage(), // Carga eventos desde localStorage
      eventClassNames: (arg) => [`fc-event-priority-${arg.event.extendedProps.priority}`], // Clases CSS según prioridad
      eventClick: this.handleEventClick.bind(this) // Manejador de clic en eventos
    });

    this.calendar.render(); // Renderiza el calendario
    this.modal = new Modal(document.getElementById('eventModal')!); // Inicializa modal principal
  }

  // Obtiene eventos almacenados en el localStorage
  getEventsFromStorage(): EventInput[] {
    const storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }

  // Guarda eventos en el localStorage
  saveEventsToStorage(events: EventInput[]) {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }

  // Abre el modal para crear nuevo evento
  openNewEventModal() {
    this.selectedEvent = null;    // Resetea evento seleccionado
    this.resetForm();             // Limpia el formulario
    this.eventDate = this.calendar.getDate().toISOString().split('T')[0]; // Fecha actual
    this.modal.show();            // Muestra el modal
  }

  // Manejador de clic en una fecha del calendario
  handleDateClick(info: any) {
    this.eventDate = info.dateStr; // Almacena la fecha seleccionada
    this.openNewEventModal();     // Abre el modal de creación
  }

  // Manejador de clic en un evento existente
  handleEventClick(info: any) {
    this.selectedEvent = info.event; // Almacena el evento seleccionado
    
    // Rellena el formulario con datos del evento
    this.eventTitle = this.selectedEvent.title;
    this.eventDate = this.selectedEvent.startStr;
    this.eventDescription = this.selectedEvent.extendedProps.description;
    this.eventPriority = this.selectedEvent.extendedProps.priority;
    
    this.modal.show(); // Muestra el modal de edición
  }

  // Maneja la creación/actualización de eventos
  handleEvent() {
    // Construye el objeto del evento
    const eventData: EventInput = {
      title: this.eventTitle,
      start: this.eventDate,
      extendedProps: {
        description: this.eventDescription,
        priority: this.eventPriority
      }
    };

    // Si es una edición, actualiza el ID y elimina el evento antiguo
    if (this.selectedEvent) {
      eventData.id = this.selectedEvent.id;
      this.selectedEvent.remove();
    }

    // Añade el nuevo evento al calendario
    this.calendar.addEvent(eventData);
    
    // Guarda todos los eventos en localStorage
    this.saveEventsToStorage(
      this.calendar.getEvents().map(e => ({
        id: e.id,
        title: e.title,
        start: e.startStr,
        extendedProps: e.extendedProps
      }))
    );

    this.modal.hide();  // Cierra el modal
    this.resetForm();   // Limpia el formulario
  }

  // Muestra el modal de confirmación para eliminar evento
  handleDeleteEvent() {
    if (this.selectedEvent) {
      this.modal.hide();     // Cierra el modal de edición
      this.deleteModal.show(); // Muestra el modal de confirmación
    }
  }

  // Confirma y ejecuta la eliminación del evento
  confirmDelete() {
    this.selectedEvent.remove(); // Elimina el evento del calendario
    
    // Actualiza localStorage con los eventos restantes
    const updatedEvents = this.calendar.getEvents().map(e => ({
      id: e.id,
      title: e.title,
      start: e.startStr,
      extendedProps: e.extendedProps
    }));
    this.saveEventsToStorage(updatedEvents);
    
    this.deleteModal.hide(); // Cierra el modal de confirmación
    this.resetForm();        // Limpia el formulario
  }

  // Reinicia los valores del formulario
  resetForm() {
    this.eventTitle = '';
    this.eventDate = '';
    this.eventDescription = '';
    this.eventPriority = 'media';
  }
}