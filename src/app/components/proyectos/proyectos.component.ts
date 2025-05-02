import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/models/Actividad';
import { Proyecto } from 'src/app/models/proyecto';
import { Usuario } from 'src/app/models/Usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyecto: Proyecto [] = [];
  dataUsuario: Usuario [] = [];

  newItems: string[] = [];
  progreso: number = 0;

  newActividad : Actividad = new Actividad();

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
}
