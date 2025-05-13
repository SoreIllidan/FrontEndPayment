import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudTiempoLibre } from '../models/SolicitudTiempoLibre';

@Injectable({
  providedIn: 'root'
})
export class SolicitudTiempoLibreService {

  private url: string = "http://localhost:5130/api/SolicitudTiempoLibre";

  constructor(private http:HttpClient) { }
 
   getAll():Observable<SolicitudTiempoLibre[]>{
     return this.http.get<SolicitudTiempoLibre[]>(this.url);
   }
 }