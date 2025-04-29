import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../models/Actividad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private url: string = "http://localhost:5130/api/Actividad";

  constructor(private http:HttpClient) { }
 
   getAll():Observable<Actividad[]>{
     return this.http.get<Actividad[]>(this.url);
   }
   
 }