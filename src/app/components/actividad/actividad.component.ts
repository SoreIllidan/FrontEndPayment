import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/models/Actividad';
import { Usuario } from 'src/app/models/Usuario';
import { VistaActividad } from 'src/app/models/VistaActividad';
import { ActividadService } from 'src/app/services/actividad.service';
import { UsuarioService } from 'src/app/services/usuario.service';

//import * as bootstrap from 'bootstrap';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  actividades : Actividad [] = [];
  newActividad : Actividad = new Actividad();

  data: VistaActividad[]=[];
  dataUsuario: Usuario[]=[];
  displayedColumns: string[] = ['titulo', 'descripcion', 'nombre', 'fecha_fin', 'estado'];

  constructor(private servicio: ActividadService, 
              private servicioUsuario: UsuarioService,
              private enrutador : Router
            ) { }

  ngOnInit(): void {
    this.getAll();
    this.getAllUsuario();
  }

  getNombreCompleto(id_usuario: number): string {
    const usuario = this.dataUsuario.find(u => u.id_usuario === id_usuario);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Sin asignar';
  }
  
  getAll(){
    this.servicio.getAll().subscribe(x => this.data = x);
  }

  getAllUsuario(){
    this.servicioUsuario.getAll().subscribe(x => this.dataUsuario = x);
  }

  resetForm() {
    this.newActividad = new Actividad();
    this.newActividad.id_actividad = 0;
  }

  poblarModal(actividad: Actividad): void {
    this.newActividad = { ...actividad }; 
    // console.log('Actividad cargada:', this.newActividad);
    // Asegura que fecha_fin esté en formato YYYY-MM-DD
    if (this.newActividad.fecha_fin) {
      this.newActividad.fecha_fin = this.newActividad.fecha_fin.split('T')[0];
    }
  }  

  onSubmit() {
    this.saveActividad();
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'En progreso':
        return 'bg-warning text-dark';    
      case 'Completado':
        return 'bg-success text-dark';    
      case 'Pendiente':
        return 'bg-info text-dark';        
      case 'Cancelado':
        return 'bg-danger text-dark';   
      default:
        return 'bg-light text-dark';             
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1).toString().padStart(2, '0');
    const day = '' + d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
  
    return [year, month, day].join('-');
  }
  
  saveActividad() {
    this.newActividad.fecha_inicio = this.formatDate(new Date());
    this.newActividad.estado ="Pendiente";
 
    console.log("nueva actividad: ",this.newActividad);
    this.servicio.saveActividad(this.newActividad).subscribe({
      next: (response) => {
        console.log('Actividad guardada', response);
        this.actividades.push(response as Actividad);
        this.getAll();
        this.resetForm();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se guardó correctamente la actividad",
          showConfirmButton: true,
          showCloseButton: true,
          showCancelButton: false,
          timer: 3000
        });
        (document.getElementById('taskModal') as any)?.click(); // cerrar modal
      },
      error: (err) => {
        console.log('Error al guardar', err);
        if (err.error && err.error.errors) {
          // Mostrar errores de validación específicos
          console.log('Errores de validación:', err.error.errors);
        }
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo Pasó",
          text: "No se logró guardar la actividad, vuelva a intentar",
          showConfirmButton: true,
          showCloseButton: true,
          showCancelButton: true,
          timer: 3000
        });
      }
    });
  }

  updateActividad() {
    if (this.newActividad.id_actividad == null) {
      console.error('ID de la actividad es null. No se puede actualizar.');
      return;
    }
  
    this.servicio.updateActividad( this.newActividad).subscribe({
      next: (response: Actividad) => {
        console.log('Actividad actualizada', response);
        this.getAll();
        this.resetForm();
  
        this.actividades = this.actividades.map(actividad => 
          actividad.id_actividad === response.id_actividad ? response : actividad
        );
  
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se actualizó correctamente la actividad",
          showConfirmButton: true,
          showCloseButton: true,
          timer: 3000
        });
  
        this.resetForm();
      },
      error: (err) => {
        console.log('Error al actualizar', err);
        if (err.error && err.error.errors) {
          // Mostrar errores de validación específicos
          console.log('Errores de validación:', err.error.errors);
        }
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo pasó",
          text: "No se logró actualizar la actividad, vuelva a intentar",
          showConfirmButton: true,
          showCloseButton: true,
          timer: 3000
        });
      }      
    });
  }
  

  
  
}