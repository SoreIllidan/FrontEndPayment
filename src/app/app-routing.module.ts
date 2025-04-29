import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

const routes: Routes = [
  
  {path: '', component:DashboardComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'tareas', component:TareaComponent},
  {path: 'Calendario', component:CalendarioComponent},
  {path: 'proyectos', component:ProyectosComponent},
  {path: 'reportes', component:ReporteComponent},
  {path: 'notificaciones', component:NotificacionesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
