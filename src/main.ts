import './reset-styles.css'
import './main.css'
import { ContadorComponent } from './components/contador'
import { TablaComponent } from './components/tabla'
import { FormComponent } from './components/Form'

const rootApp = document.getElementById('app')

const contador = new ContadorComponent()
const tabla = new TablaComponent()
const form = new FormComponent()

rootApp?.appendChild(contador.contadorHTML)
rootApp?.appendChild(tabla.tablaHTML)
rootApp?.appendChild(form.formHTML)
