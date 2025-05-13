export interface Documento {
    idDocumento: number;
    titulo: string;
    descripcion: string | null;
    tipo: string;
    fechaCreacion: Date;
    fechaUltimaModificacion: Date | null;
    autor: number | null;
}