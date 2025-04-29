import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../models/Empresa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url: string = "http://localhost:5130/api/Empresa";
  
  constructor(private http:HttpClient) { }
   getAll():Observable<Empresa[]>{
     return this.http.get<Empresa[]>(this.url);
   }
 }