export interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido: string;
    direccion: string;
    correo_electronico: string;
    telefono: string;
    fecha_contrato?: Date;
    cargo: string;
    id_area: number;
    estado?: boolean;
    //---------------------BORRAR CREAR TABLA HORAS TRABAJO----------------------------
    horas_trabajo?: string; // Aquí agregas la propiedad horas_trabajo
    fecha?: Date | null;
    inicio?: Date | null;
    fin?: Date | null;
    pausas?: string;
    total_horas?: string;
}