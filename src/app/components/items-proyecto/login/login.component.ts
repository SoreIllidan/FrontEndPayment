import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios: Usuario[] = [];
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

  login() {
  this.usuarioService.getAll().subscribe((usuarios: Usuario[]) => {
    const usuarioValido = usuarios.find(usuario => usuario.user === this.email && usuario.password === this.password);

    if (usuarioValido) {
      this.loginError = false;

      localStorage.setItem('nombreUsuario', usuarioValido.nombre + " " + usuarioValido.apellido);

      this.router.navigate(['/menu']);
    } else {
      this.loginError = true;

      // Mostrar alerta de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Correo o contraseña incorrectos. Por favor, intenta de nuevo.',
        confirmButtonColor: '#d33'
      });
    }
  }, error => {
    console.error('Error al obtener usuarios', error);
    this.loginError = true;

    // Alerta si hay error en la llamada al backend
    Swal.fire({
      icon: 'error',
      title: 'Error del servidor',
      text: 'No se pudo obtener la lista de usuarios. Intenta más tarde.',
      confirmButtonColor: '#d33'
    });
  });
}

}
