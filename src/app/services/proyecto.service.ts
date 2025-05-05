import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { Observable } from 'rxjs';
import { ItemsProyecto } from '../models/ItemsProyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService { 

  private urlProyecto: string = 'http://localhost:5130/api/Proyecto';
  private urlItemsProyecto: string = 'http://localhost:5130/api/ItemsProyecto/id/'

  constructor(private http:HttpClient) { }

  // Obtener los ítems de un proyecto por su ID
  getItemsPorProyecto(idProyecto: number): Observable<ItemsProyecto[]> {
    return this.http.get<ItemsProyecto[]>(`${this.urlItemsProyecto}${idProyecto}`);
  }
  
  getAll():Observable<Proyecto[]>{
        return this.http.get<Proyecto[]>(this.urlProyecto);
  }
  
  saveProyecto(proyecto: Proyecto): Observable<Object>{
        return this.http.post(this.urlProyecto, proyecto);
  }
  

}
