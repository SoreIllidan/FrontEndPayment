export interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido: string;
    direccion: string;
    correo_electronico: string;
    telefono: string;
    fecha_contrato?: Date | null;
    cargo: string;
    id_area: number;
    estado?: boolean | null;
}