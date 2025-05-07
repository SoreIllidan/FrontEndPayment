import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemsProyecto } from '../models/ItemsProyecto';
import { Observable } from 'rxjs';
import { ActualizarItemDto } from '../models/ActualizarItemDto';

@Injectable({
  providedIn: 'root'
})
export class ItemsProyectoService {

  private urlItemsProyecto: string = 'http://localhost:5130/api/ItemsProyecto'

  constructor(private http:HttpClient) { }

  // Obtener los ítems de un proyecto por su ID
   getItemsPorProyecto(idProyecto: number): Observable<ItemsProyecto[]> {
    return this.http.get<ItemsProyecto[]>(this.urlItemsProyecto + '/id/' + idProyecto);

  }
  
  saveItemsProyecto(itemsProyecto: ItemsProyecto): Observable<Object>{
    return this.http.post(this.urlItemsProyecto, itemsProyecto);
  }

  deleteItemsByProyecto(idProyecto: number): Observable<Object> {
    return this.http.delete(`${this.urlItemsProyecto}/proyecto/${idProyecto}`);
  }  

  updateEstadoItem(dto: ActualizarItemDto): Observable<any> {
    return this.http.put(`${this.urlItemsProyecto}`, dto);
  }


}
