export type Tabla = Fila[]

export interface Fila {
  fecha: string,
  descripcion: string,
  monto: Monto,
}

export interface Monto {
  cifra: number,
  tipo: 'c' | 'd'
}