import { Component, OnInit } from '@angular/core';
import { ItemsProyecto } from 'src/app/models/ItemsProyecto';
import { Proyecto } from 'src/app/models/Proyecto';


import { Usuario } from 'src/app/models/Usuario';
import { ItemsProyectoService } from 'src/app/services/items-proyecto.service';
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

  newItems: string[] = ['','',''];
  progreso: number = 0;



  newProyecto : Proyecto = new Proyecto();
  newItemsProyecto : ItemsProyecto = new ItemsProyecto();


  constructor(private servicioProyecto: ProyectoService,
              private servicioUsuario: UsuarioService,
              private servicioItems: ItemsProyectoService
  ) { }

  ngOnInit(): void {
    this.getAll(); 
    this.getAllUsuario(); 
  }

  getAll() {
    this.servicioProyecto.getAll().subscribe(x => { this.proyecto = x;
      // console.log("Lista de Proyectos", this.proyecto);  // Muestra los proyectos en la consola
    });
  }

  getItemsPorProyecto(proyecto: Proyecto) {
    this.servicioItems.getItemsPorProyecto(proyecto.id_proyecto).subscribe(items => {
      this.itemsProyecto = items;
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
      this.itemsProyecto = []; // <-- Limpiar ítems al cerrar el modal
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
    console.log('Iniciando guardado del proyecto...');
    
    this.newProyecto.fecha_creacion = this.formatDate(new Date());
    this.newProyecto.fecha_actualizacion = this.formatDate(new Date());
    this.newProyecto.estado = "No Iniciado";
  
    // Guardar el proyecto
    console.log('Guardando proyecto...', this.newProyecto);
    
    this.servicioProyecto.saveProyecto(this.newProyecto).subscribe({
      next: (proyectoGuardado: any) => {
        const idProyecto = proyectoGuardado.id_proyecto;
        console.log('Proyecto guardado con ID:', idProyecto);
        
        // Guardar ítems del proyecto
        let itemsGuardados = 0;
        console.log('Iniciando guardado de los ítems del proyecto...');
        
        for (let descripcion of this.newItems) {
          if (!descripcion || descripcion.trim() === '') {
            console.log('Descripción vacía o inválida, se omite.');
            continue;
          }
          
          const item: ItemsProyecto = {
            ID_ITEMS: 0,
            descripcion: descripcion.trim(),
            ID_PROYECTO: idProyecto,
            fecha_creacion: this.formatDate(new Date()),
            estado: "No Iniciado"
          };
  
          console.log('Guardando ítem:', item);
          
          this.servicioItems.saveItemsProyecto(item).subscribe({
            next: () => {
              console.log('Ítem guardado correctamente');
              itemsGuardados++;
              if (itemsGuardados === this.newItems.length) {
                console.log('Todos los ítems han sido guardados.');
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Proyecto y sus ítems guardados correctamente",
                  showConfirmButton: true,
                  timer: 3000
                });
                this.getAll(); // o actualiza tu lista de proyectos
                this.resetForm();
              }
            },
            error: (err) => {
              console.error('Error al guardar ítem:', err);
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al guardar ítem",
                text: "Ocurrió un error al guardar uno de los ítems del proyecto.",
                showConfirmButton: true
              });
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al guardar proyecto:', err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al guardar",
          text: "No se pudo guardar el proyecto.",
          showConfirmButton: true
        });
      }
    });
  }
  
  

    saveItemsProyecto() {
      this.newItemsProyecto.fecha_creacion = this.formatDate(new Date());
      this.newItemsProyecto.estado ="No Iniciado";
   
      console.log("nuevo itemsproyecto: ",this.newItemsProyecto);
      this.servicioItems.saveItemsProyecto(this.newItemsProyecto).subscribe({
        next: (response) => {
          console.log('Iitems Proyecto guardado', response);
          this.itemsProyecto.push(response as ItemsProyecto);
          this.getAll();
          this.resetForm();
  
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Se guardó correctamente los Items proyecto",
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: false,
            timer: 3000
          });
        },
        error: (err) => {
          console.log('Error al guardar los items proyecto', err);

            console.log('Errores de validación:', err.error.errors);
          
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo Pasó",
            text: "No se logró guardar los items proyecto, vuelva a intentar",
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: true,
            timer: 3000
          });
        }
      });
    }


    // saveProyecto2() {
    //   this.newProyecto.fecha_creacion = this.formatDate(new Date());
    //   this.newProyecto.fecha_actualizacion = this.formatDate(new Date());
    //   this.newProyecto.estado = "No Iniciado";
    
    //   // Validar que haya al menos 3 ítems
    //   if (this.newItems.filter(i => i.trim() !== '').length < 3) {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'Faltan ítems',
    //       text: 'Debes ingresar al menos 3 ítems para continuar.',
    //     });
    //     return;
    //   }
    
    //   console.log("nuevo proyecto: ", this.newProyecto);
    
    //   this.servicioProyecto.saveProyecto(this.newProyecto).subscribe({
    //     next: (response) => {
    //       const idProyecto = response.id_proyecto;
    //       console.log('Proyecto guardado con ID:', idProyecto);
    
    //       for (let descripcion of this.newItems) {
    //         const item: ItemsProyecto = {
    //           ID_ITEMS: 0,
    //           ID_PROYECTO: idProyecto,
    //           descripcion: descripcion,
    //           estado: 'No Iniciado',
    //           fecha_creacion: new Date()
    //         };
    
    //         this.servicioProyecto.saveItemsProyecto(item).subscribe({
    //           next: () => console.log('Ítem registrado:', item.descripcion),
    //           error: err => console.error('Error al registrar ítem:', err)
    //         });
    //       }
    
    //       this.getAll();
    //       this.resetForm();
    
    //       Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "Se guardó correctamente el proyecto y sus ítems",
    //         showConfirmButton: true,
    //         timer: 3000
    //       });
    //     },
    //     error: (err) => {
    //       console.error('Error al guardar el proyecto', err);
    //       Swal.fire({
    //         icon: "error",
    //         title: "Error",
    //         text: "No se logró guardar el proyecto. Inténtalo nuevamente.",
    //         showConfirmButton: true,
    //         timer: 3000
    //       });
    //     }
    //   });
    // }
    
}

