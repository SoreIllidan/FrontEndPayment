import { Component, OnInit } from '@angular/core';
import { VistaActividad } from 'src/app/models/VistaActividad';
import { TareaService } from 'src/app/services/tarea.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    data: VistaActividad[]=[];
    displayedColumns: string[] = ['titulo',  'nombre', 'fecha_fin', 'estado'];

  constructor(private servicio: TareaService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.servicio.getAll().subscribe(x => this.data = x);
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
