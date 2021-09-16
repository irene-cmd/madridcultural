export interface Event {
    id: number,
    nombre: string,
    lugar: string,
    fecha: string,
    descripcion: string,
    fk_preferencia: number,
    estado: number,
    imagen?: string
}
