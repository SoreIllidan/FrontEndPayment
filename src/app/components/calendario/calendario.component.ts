import { Component, OnInit } from '@angular/core';
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendar!: Calendar;

  constructor() { }

  // Evento seleccionado para edición/eliminación
  selectedEvent: any = null;

  eventTitle = '';     
  eventDate = '';         
  eventDescription = '';  
  eventPriority = 'media'; 

  ngOnInit(): void {

  }

    // Abre el modal para crear nuevo evento
    openNewEventModal() {
      this.selectedEvent = null;    // Resetea evento seleccionado
      this.resetForm();             // Limpia el formulario
      this.eventDate = this.calendar.getDate().toISOString().split('T')[0]; // Fecha actual
    }

    // Manejador de clic en una fecha del calendario
    handleDateClick(info: any) {
      this.eventDate = info.dateStr; // Almacena la fecha seleccionada
      this.openNewEventModal();     // Abre el modal de creación
    }

   resetForm() {
    this.eventTitle = '';
    this.eventDate = '';
    this.eventDescription = '';
    this.eventPriority = 'media';
  }

  // Guarda eventos en el localStorage
  saveEventsToStorage(events: EventInput[]) {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }

    confirmDelete() {
      this.selectedEvent.remove();
      
      // Actualiza localStorage con los eventos restantes
      const updatedEvents = this.calendar.getEvents().map(e => ({
        id: e.id,
        title: e.title,
        start: e.startStr,
        extendedProps: e.extendedProps
      }));
      this.saveEventsToStorage(updatedEvents);
      
    
      this.resetForm();        // Limpia el formulario
    }


   // Manejador de clic en un evento existente
   handleEventClick(info: any) {
    this.selectedEvent = info.event; // Almacena el evento seleccionado
    
    // Rellena el formulario con datos del evento
    this.eventTitle = this.selectedEvent.title;
    this.eventDate = this.selectedEvent.startStr;
    this.eventDescription = this.selectedEvent.extendedProps.description;
    this.eventPriority = this.selectedEvent.extendedProps.priority; 
  
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

    this.resetForm();   // Limpia el formulario
  }

  // Muestra el modal de confirmación para eliminar evento
  handleDeleteEvent() {
    if (this.selectedEvent) {
     
    }
  }



}
