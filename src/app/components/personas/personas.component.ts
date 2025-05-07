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

}
