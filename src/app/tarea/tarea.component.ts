import { Component, OnInit } from '@angular/core';
import { VistaActividad } from '../models/VistaActividad';
import { TareaService } from '../services/tarea.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  data: VistaActividad[]=[];
  dataUsuario: Usuario[]=[];
  displayedColumns: string[] = ['titulo', 'descripcion', 'nombre', 'fecha_fin', 'estado'];

  constructor(private servicio: TareaService, private servicioUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.getAll();
    this.getAllUsuario();
  }

  getAll(){
    this.servicio.getAll().subscribe(x => this.data = x);
  }

  getAllUsuario(){
    this.servicioUsuario.getAll().subscribe(x => this.dataUsuario = x);
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
  
  

}

