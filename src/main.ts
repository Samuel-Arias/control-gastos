import './styles/reset-styles.css'
import './styles/fonts.css'
import './main.css'
import { ContadorComponent } from './components/contador'
import { TablaComponent } from './components/tabla'
import { FormComponent } from './components/form'
import type { FormHandler } from './interfaces/form.interface'
import type { Fila } from './interfaces/tabla.interface'
import { obtenerFechaActual } from './helpers/fecha'

const rootApp = document.getElementById('app')

const contador = new ContadorComponent()
const tabla = new TablaComponent()

const envioFormulario: FormHandler = (data) => {
  const { descripcion, monto } = data
  const fechaActual = obtenerFechaActual()

  const fila: Fila = {
    descripcion,
    monto: { cifra: Math.abs(monto), tipo: monto > 0 ? 'c' : 'd' },
    fecha: fechaActual,
  }

  tabla.aniadirFila(fila)
  contador.actualizarContador(monto)
}

const form = new FormComponent(envioFormulario)

rootApp?.appendChild(contador.contadorHTML)
rootApp?.appendChild(tabla.tablaHTML)
rootApp?.appendChild(form.formHTML)