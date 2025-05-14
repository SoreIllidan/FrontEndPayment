import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VistaActividad } from 'src/app/models/VistaActividad';
import { ActividadService } from 'src/app/services/actividad.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TareaService } from 'src/app/services/tarea.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    data: VistaActividad[]=[];
    displayedColumns: string[] = ['titulo',  'nombre', 'fecha_fin', 'estado'];
    tareasPendientes: number = 0;
    proyectoPendientes: number = 0;

  constructor(private servicio: TareaService
    , private actividadService: ActividadService
  , private proyectoService: ProyectoService,
  private router: Router) { }

  ngOnInit(): void {
    this.getAll();
    this.getCantidadPendientesProyecto() ;
    this.getCantidadPendientesActividad();
 }

 navegarAProyectosEnProgreso() {
  this.router.navigate(['/menu/proyectos']); 
}

navegarATareasEnProgreso() {
  this.router.navigate(['/menu/actividades'], { queryParams: { estado: 'Pendiente' } });
}


//Contar los registros
  getCantidadPendientesActividad() {
  this.actividadService.getCountPendiente().subscribe(count => {
    this.tareasPendientes = count;
  });
}

//Contar los registros
  getCantidadPendientesProyecto() {
  this.proyectoService.getCountPendiente().subscribe(count => {
    this.proyectoPendientes = count;
  });
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
