import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from '../models/Documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private url: string = "http://localhost:5130/api/Documento";

  constructor(private http:HttpClient) { }
 
   getAll():Observable<Documento[]>{
     return this.http.get<Documento[]>(this.url);
   }
 }