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
      this._tabla.forEach(fila => this.renderizarFila(fila))
    }

    // Ejecutar después de insertar la tabla en el HTML
    requestAnimationFrame(this.actualizarTextosDesbordados);

    // Volver a calcular cuando cambia el tamaño de la ventana
    window.addEventListener( 'resize', this.actualizarTextosDesbordados )
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
    celda.tabIndex = 0

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

  private renderizarFila(fila: Fila): void {
    this._tablaHTML.appendChild(this.aniadirCelda(fila.fecha))
    this._tablaHTML.appendChild(this.aniadirCelda(fila.descripcion))
    this._tablaHTML.appendChild(this.aniadirCelda(fila.monto))
  }

  aniadirFila(fila: Fila): void {
    if (this._tabla.length <= 0) {
      const mensaje = this._tablaHTML.children[3]
      this._tablaHTML.removeChild(mensaje)
    }

    this._tabla.push(fila)

    this.renderizarFila(fila)

    localStorage.setItem(lsKeys.TABLA, JSON.stringify(this._tabla))

    requestAnimationFrame(this.actualizarTextosDesbordados);
  }

  private actualizarTextosDesbordados(): void {
    const celdas = document.querySelectorAll<HTMLElement>('#tabla > .celda');

    celdas.forEach((celda) => {
      const texto = celda.querySelector<HTMLElement>('p');

      if (!texto) return;

      // Reinicia el estado antes de volver a calcularlo
      texto.classList.remove('texto-desbordado')
      texto.style.removeProperty('--excedente')

      const estilosCelda = getComputedStyle(celda)

      const paddingHorizontal = parseFloat(estilosCelda.paddingLeft) + parseFloat(estilosCelda.paddingRight)

      const anchoDisponible = celda.clientWidth - paddingHorizontal

      const excedente = texto.scrollWidth - anchoDisponible

      if (excedente > 0) {
        texto.style.setProperty( '--excedente', `${excedente}px` )

        texto.classList.add('texto-desbordado')
      }
    })
  }

  get tablaHTML(): HTMLElement {
    return this._tablaHTML
  }
}