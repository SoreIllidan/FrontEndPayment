import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelComponent } from './panel/panel.component';
import { TareaComponent } from './tarea/tarea.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ReporteComponent } from './reporte/reporte.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    TareaComponent,
    ProyectosComponent,
    ReporteComponent,
    NotificacionesComponent,
    CalendarioComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
