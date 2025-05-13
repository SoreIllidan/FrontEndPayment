import { Injectable } from '@angular/core';
import { RolUsuario } from '../models/RolUsuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {

  private url: string = "http://localhost:5130/api/RolUsuario";

  constructor(private http:HttpClient) { }
 
   getAll():Observable<RolUsuario[]>{
     return this.http.get<RolUsuario[]>(this.url);
   }
 }