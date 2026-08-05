import { lsKeys } from '../constants/constants'
import type { Fila, Monto, Tabla } from '../interfaces/tabla.interface'

export class TablaComponent {
  private _tabla: Tabla = []
  private readonly _tablaHTML: HTMLElement
  private readonly _titulosCabecera = ['Fecha', 'Descripción', 'Monto']

  constructor() {
    const tablaLS = localStorage.getItem(lsKeys.TABLA)
    if (tablaLS) this._tabla = JSON.parse(tablaLS)


    this._tablaHTML = this.inicializarTablaHTML()

    if (this._tabla.length <= 0) {
      this._tablaHTML.appendChild(this.aniadirCelda('No has hecho movimientos hasta ahora.', '', 'no-mov'))
    } else {
      this._tabla.forEach(fila => this.aniadirFila(fila))
    }
  }

  private inicializarTablaHTML(): HTMLElement {
    const section = document.createElement('section')
    section.id = 'tabla'
    
    this._titulosCabecera.forEach(titulo => {
      const celda = this.aniadirCelda(titulo, 'cabecera')
      section.appendChild(celda)
    })

    return section
  }

  private aniadirCelda(dato: string | Monto, className?: string, id?: string): HTMLElement {
    const celda = document.createElement('div')
    celda.classList.add('celda')
    className && celda.classList.add(className)
    celda.id = id || ''

    const p = document.createElement('p')
    if (typeof dato === 'string') p.innerText = dato
    else {
      const {cifra, tipo} = dato
      let operador = '-'

      if (tipo === 'c') {
        operador = '+'
        celda.classList.add('plus')
      } else {
        celda.classList.add('minus')
      }

      p.innerText = `${operador} $${cifra}`
    }

    celda.appendChild(p)

    return celda
  }

  aniadirFila(fila: Fila): void {
    if (this._tabla.length <= 0) {
      const mensaje = this._tablaHTML.children[3]
      this._tablaHTML.removeChild(mensaje)
    }

    this._tabla.push(fila)

    this._tablaHTML.appendChild(this.aniadirCelda(fila.fecha))
    this._tablaHTML.appendChild(this.aniadirCelda(fila.descripcion))
    this._tablaHTML.appendChild(this.aniadirCelda(fila.monto))

    localStorage.setItem(lsKeys.TABLA, JSON.stringify(this._tabla))
  }

  get tablaHTML(): HTMLElement {
    return this._tablaHTML
  }
}