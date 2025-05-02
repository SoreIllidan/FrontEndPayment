import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService { 

  private urlProyecto: string = 'http://localhost:5130/api/Proyecto';

  constructor(private http:HttpClient) { }

  getAll():Observable<Proyecto[]>{
        return this.http.get<Proyecto[]>(this.urlProyecto);
  }
  

}
