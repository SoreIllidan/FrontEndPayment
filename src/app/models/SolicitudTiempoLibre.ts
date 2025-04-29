export interface SolicitudTiempoLibre{
    idSolicitud: number;
    idUsuario: number;
    tipoTiempoLibre: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
}