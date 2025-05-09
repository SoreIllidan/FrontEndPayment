import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {


  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

   // Bandera para mostrar la tabla de personas
   mostrarTablaPersonas: boolean = true;

   // Bandera para mostrar las horas de trabajo
   mostrarHorasTrabajo: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getAll().subscribe((data) => {
      this.usuarios = data;
      this.usuariosFiltrados = data;
    });
  }

  filtrarUsuarios(event: any): void {
    const texto = event.target.value.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(
      (u) =>
        u.nombre.toLowerCase().includes(texto) ||
        u.correo_electronico.toLowerCase().includes(texto) ||
        (u.fecha_contrato && u.fecha_contrato.toString().includes(texto))
    );
  }

   // Mostrar la tabla de personas
   mostrarPersonas(): void {
    this.mostrarTablaPersonas = true;
    this.mostrarHorasTrabajo = false;
  }

  // Mostrar las horas de trabajo
  mostrarHoras(): void {
    this.mostrarTablaPersonas = false;
    this.mostrarHorasTrabajo = true;
  }

}
