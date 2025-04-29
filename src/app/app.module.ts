import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TareaComponent } from './tarea/tarea.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PARA USAR COMPONENTES MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';


import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientModule,
    BrowserAnimationsModule,
    //PARA IMPORTAR COMPONENTES DE MATERIAL
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
