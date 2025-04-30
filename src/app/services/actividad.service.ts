import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../models/Actividad';
import { Observable } from 'rxjs';
import { VistaActividad } from '../models/VistaActividad';

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

    saveActividad(producto: Actividad): Observable<Object>{
      return this.http.post(this.urlActividad, producto);
    }

    updateActividad(id:number, producto: Actividad ): Observable<Object>{
      return this.http.put(`${this.urlActividad}/${id}`, producto);
    }

    deleteActividad(id: number): Observable<Object>{
      return this.http.delete(`${this.urlActividad}/${id}`);
    }

 }