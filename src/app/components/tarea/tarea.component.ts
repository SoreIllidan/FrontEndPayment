import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { VistaActividad } from 'src/app/models/VistaActividad';
import { TareaService } from 'src/app/services/tarea.service';
import { UsuarioService } from 'src/app/services/usuario.service';


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

