import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { Observable } from 'rxjs';
import { ItemsProyecto } from '../models/ItemsProyecto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService { 

  private urlProyecto: string = 'http://localhost:5130/api/Proyecto';

  constructor(private http:HttpClient) { }
  
  getAll():Observable<Proyecto[]>{
        return this.http.get<Proyecto[]>(this.urlProyecto);
  }

   getCountPendiente(): Observable<number> {
        return this.http.get<Proyecto[]>(`${this.urlProyecto}/pendiente`).pipe(
          map((actividades: Proyecto[]) => actividades.length)
        );
      }
  
  saveProyecto(proyecto: Proyecto): Observable<Object>{
        return this.http.post(this.urlProyecto, proyecto);
  }

    // En tu servicio proyecto
  updateProyecto(proyecto: Proyecto): Observable<Object> {
    return this.http.put(`${this.urlProyecto}/${proyecto.id_proyecto}`, proyecto);
  }


}
