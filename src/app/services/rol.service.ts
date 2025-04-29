import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/Rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = "http://localhost:5130/api/Rol";

  constructor(private http:HttpClient) { }
 
   getAll():Observable<Rol[]>{
     return this.http.get<Rol[]>(this.url);
   }
 }