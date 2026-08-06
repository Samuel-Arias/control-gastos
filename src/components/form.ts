import { FormKeys } from "../constants/constants"
import type { Form, FormHandler } from "../interfaces/form.interface"

export class FormComponent {
  private _inpMontoHTML!: HTMLInputElement
  private _inpDescHTML!: HTMLInputElement
  private _btnHTML!: HTMLButtonElement
  private _formHTML!: HTMLFormElement
  private readonly _sectionHTML: HTMLElement
  private readonly onSubmitHandler!: FormHandler

  constructor(handler: FormHandler) {
    this.inicializarInputs('desc')
    this.inicializarInputs('monto')
    this.inicializarBoton()

    this.onSubmitHandler = handler
    this._sectionHTML = document.createElement('section')

    this.inicializarForm()
  }

  private inicializarInputs(tipo: 'desc' | 'monto'): void {
    const input = document.createElement('input')
    input.autocomplete = 'off'

    if (tipo === 'desc') {
      input.type = 'text'
      input.name = 'descripcion'
      input.placeholder = 'Ingrese la descripción'
      input.tabIndex = 1
      input.id = 'descripcion'
      this._inpDescHTML = input
    } else {
      input.type = 'number'
      input.name = 'monto'
      input.placeholder = 'Ingrese el monto'
      input.tabIndex = 2
      input.id = 'monto'
      this._inpMontoHTML = input
    }
  }

  private inicializarBoton(): void {
    this._btnHTML = document.createElement('button')
    this._btnHTML.type = 'submit'
    this._btnHTML.innerText = 'Registrar'
    this._btnHTML.tabIndex = 3
  }

  private inicializarForm(): void {
    this._sectionHTML.id = 'input'

    this._formHTML = document.createElement('form')
    this._formHTML.appendChild(this._inpDescHTML)
    this._formHTML.appendChild(this._inpMontoHTML)
    this._formHTML.appendChild(this._btnHTML)
    
    this._formHTML.addEventListener('submit', (e: Event) => this.onSubmit(e))

    this._sectionHTML.appendChild(this._formHTML)
  }

  private onSubmit(e: Event): void {
    e.preventDefault()

    const formData = new FormData(this._formHTML)
    
    const form: Form = {
      descripcion: formData.get(FormKeys.DESC ?? '') as string,
      monto: Number(formData.get(FormKeys.MONTO) ?? 0),
    }

    this._formHTML.reset()

    this.onSubmitHandler(form)
  }

  get formHTML(): HTMLElement {
    return this._sectionHTML
  }
}