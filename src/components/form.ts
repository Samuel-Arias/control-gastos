export class FormComponent {
  private readonly _inpMontoHTML: HTMLInputElement
  private readonly _inpDescHTML: HTMLInputElement
  private readonly _btnHTML: HTMLButtonElement
  private readonly _formHTML: HTMLElement

  constructor() {
    this._inpMontoHTML = document.createElement('input')
    this._inpDescHTML = document.createElement('input')
    this._btnHTML = document.createElement('button')
    this._formHTML = document.createElement('section')

    this.inicializarForm()
  }

  private inicializarForm(): void {
    this._formHTML.id = 'input'

    // const form = document.createElement('form')
    // form.appendChild(this._inpDescHTML)
    // form.appendChild(this._inpMontoHTML)
    // form.appendChild(this._btnHTML)

    // this._formHTML.appendChild(form)
  }

  get formHTML(): HTMLElement {
    return this._formHTML
  }
}