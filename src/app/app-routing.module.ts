import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TareaComponent } from './tarea/tarea.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'tarea', component:TareaComponent},
  {path: 'calendario', component:CalendarioComponent},
  {path: 'proyecto', component:ProyectosComponent},
  {path: 'reporte', component:ReporteComponent},
  {path: 'notificacion', component:NotificacionesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
