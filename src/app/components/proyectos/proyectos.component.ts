import { Component, OnInit } from '@angular/core';
import { ItemsProyecto } from 'src/app/models/ItemsProyecto';
import { Proyecto } from 'src/app/models/Proyecto';


import { Usuario } from 'src/app/models/Usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyecto: Proyecto [] = [];
  dataUsuario: Usuario [] = [];
  itemsProyecto: ItemsProyecto[] = [];

  newItems: string[] = [];
  progreso: number = 0;



  newProyecto : Proyecto = new Proyecto();


  constructor(private servicioProyecto: ProyectoService,
    private servicioUsuario: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getAll(); 
    this.getAllUsuario(); 
  }

  getAll() {
    this.servicioProyecto.getAll().subscribe(x => { this.proyecto = x;
      console.log("Lista de Proyectos", this.proyecto);  // Muestra los proyectos en la consola
    });
  }

  getItemsPorProyecto(proyecto: Proyecto) {
    this.servicioProyecto.getItemsPorProyecto(proyecto.id_proyecto).subscribe(items => {
      this.itemsProyecto = items;
      console.log("Ítems del proyecto:", this.itemsProyecto);
    });
  }

    modoEdicion: boolean = false;
    mostrarBotonModificar: boolean = false;

    activarEdicionProgreso() {
      this.modoEdicion = true;
      this.mostrarBotonModificar = true;
    }

    cerrarModal() {
      this.modoEdicion = false;
      this.mostrarBotonModificar = false;
    }

  poblarModal(proyectos: Proyecto): void {
    this.newProyecto = { ...proyectos}; 
    this.getItemsPorProyecto(proyectos);

    if (this.newProyecto.fecha_creacion) {
      this.newProyecto.fecha_creacion = this.newProyecto.fecha_creacion.split('T')[0];
      this.newProyecto.fecha_limite = this.newProyecto.fecha_limite.split('T')[0];
      this.newProyecto.fecha_actualizacion = this.newProyecto.fecha_actualizacion.split('T')[0];
    }

  }

  getAllUsuario(){
    this.servicioUsuario.getAll().subscribe(x => this.dataUsuario = x);
  }

  updateProgress() {
    const total = this.newItems.length;
    this.progreso = Math.min((total / 3) * 100, 100);
  }

  addItem() {
    this.newItems.push(''); // agrega un ítem vacío
    this.updateProgress();
  }

  removeItem(index: number) {
    this.newItems.splice(index, 1);
  }

  resetForm() {
    this.newProyecto = new Proyecto();
    this.newProyecto.id_proyecto = 0;
  }
  formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1).toString().padStart(2, '0');
    const day = '' + d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
  
    return [year, month, day].join('-');
  }

  updateProyecto(){
    
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'No Iniciado':
        return 'bg-secondary text-white';  // Gris
      case 'Iniciado':
        return 'bg-info text-white';       // Celeste
      case 'En Progreso':
        return 'bg-primary text-white';    // Azul
      case 'Completado':
        return 'bg-success text-white';    // Verde
      case 'Cancelado':
        return 'bg-danger text-white';     // Rojo
      default:
        return 'bg-light text-dark';       // Por defecto, gris claro
    }
  }
  
  saveProyecto() {
      this.newProyecto.fecha_creacion = this.formatDate(new Date());
      this.newProyecto.fecha_actualizacion = this.formatDate(new Date());
      this.newProyecto.estado ="No Iniciado";
   
      console.log("nuevo proyecto: ",this.newProyecto);
      this.servicioProyecto.saveProyecto(this.newProyecto).subscribe({
        next: (response) => {
          console.log('Proyecto guardado', response);
          this.proyecto.push(response as Proyecto);
          this.getAll();
          this.resetForm();
  
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Se guardó correctamente el proyecto",
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: false,
            timer: 3000
          });
        },
        error: (err) => {
          console.log('Error al guardar el proyecto', err);

            console.log('Errores de validación:', err.error.errors);
          
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo Pasó",
            text: "No se logró guardar el proyecto, vuelva a intentar",
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: true,
            timer: 3000
          });
        }
      });
    }

}

