import { useState } from 'react'
import './App.css'
import Formulario from './componentes/formularioNombre/Formulario.jsx'
import Home from './componentes/home/Home.jsx'

function App() {

  const [nombre, setNombre] = useState('')

  return (
    <div>
      {
        !nombre.length > 0 
        ? <Formulario setNombre={setNombre} />
        : <Home nombre={nombre}/>
      }
    </div>
  )
}

export default App
