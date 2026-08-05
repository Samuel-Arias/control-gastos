import { CountUp } from "countup.js"
import { lsKeys } from "../constants/constants"
import { Odometer } from "odometer_countup"

export class ContadorComponent {
  private _monto: number = 0
  private readonly _contadorHTML: HTMLElement
  private readonly _countup: CountUp

  constructor() {
    const contadorLS = localStorage.getItem(lsKeys.CONTADOR)
    if (contadorLS) this._monto = parseInt(contadorLS)
    
    this._contadorHTML = this.inicializarContadorHTML()
    this._countup = this.inicializarCountup()
  }

  private inicializarContadorHTML(): HTMLElement {
    const element = document.createElement('section')
    element.id = 'contador'

    return element
  }

  private inicializarCountup(): CountUp {
    return new CountUp(this._contadorHTML, null, {
      startVal: this._monto,
      duration: 0.5,
      plugin: new Odometer({ duration: 1.5 }),
      decimalPlaces: 2,
      separator: '.',
      decimal: ',',
      prefix: '$'
    })
  }

  sumar(cifra: number): void {
    this._monto += cifra
    this._countup.update(this._monto)
    localStorage.setItem(lsKeys.CONTADOR, this._monto.toString())
  }

  restar(cifra: number): void {
    this._monto -= cifra
    this._countup.update(this._monto)
    localStorage.setItem(lsKeys.CONTADOR, this._monto.toString())
  }

  get contadorHTML(): HTMLElement {
    return this._contadorHTML
  }
}