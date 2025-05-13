import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/Area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private url: string = "http://localhost:5130/api/Area";

  constructor(private http:HttpClient) { }
 
   getAll():Observable<Area[]>{
     return this.http.get<Area[]>(this.url);
   }
 }