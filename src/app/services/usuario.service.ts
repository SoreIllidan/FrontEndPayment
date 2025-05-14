import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "http://localhost:5130/api/Usuario";

  constructor(private http:HttpClient) { }

  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }
}
