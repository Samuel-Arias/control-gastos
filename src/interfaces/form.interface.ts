export interface Form {
  descripcion: string
  monto: number
}

export type FormHandler = (formData: Form) => void