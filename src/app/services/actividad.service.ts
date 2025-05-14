import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../models/Actividad';
import { Observable } from 'rxjs';
import { VistaActividad } from '../models/VistaActividad';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {


  private url: string = 'http://localhost:5130/api/VistaActividadesUsuario';
  private urlActividad: string = 'http://localhost:5130/api/Actividad';

  constructor(private http:HttpClient) { }
  
    getAll():Observable<VistaActividad[]>{
      return this.http.get<VistaActividad[]>(this.urlActividad);
    }

    getAllActividad():Observable<Actividad[]>{
      return this.http.get<Actividad[]>(this.url);
    }

    getCountPendiente(): Observable<number> {
      return this.http.get<Actividad[]>(`${this.urlActividad}/pendiente`).pipe(
        map((actividades: Actividad[]) => actividades.length)
      );
    }

    saveActividad(actividad: Actividad): Observable<Object>{
      return this.http.post(this.urlActividad, actividad);
    }

    updateActividad(actividad: Actividad): Observable<Actividad>{
      return this.http.put<Actividad>(`${this.urlActividad}/${actividad.id_actividad}`, actividad);
    }

    deleteActividad(id: number): Observable<Object>{
      return this.http.delete(`${this.urlActividad}/${id}`);
    }

 }