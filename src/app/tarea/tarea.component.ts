import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'priority', 'status'];
  dataSource = ELEMENT_DATA;  
  constructor() { }

  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  priority: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', priority: 'Alta', status: 'En progreso' },
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',priority: 'Alta', status: 'En progreso'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',priority: 'Alta', status: 'En progreso'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',priority: 'Alta', status: 'En progreso'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',priority: 'Alta', status: 'En progreso'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',priority: 'Alta', status: 'En progreso'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',priority: 'Alta', status: 'En progreso'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',priority: 'Alta', status: 'En progreso'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',priority: 'Alta', status: 'En progreso'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',priority: 'Alta', status: 'En progreso'},
];
