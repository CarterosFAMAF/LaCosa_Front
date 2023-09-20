import './App.css'

// Componentes
import Mano from './componentes/mano/Mano'

// Cartas png Hardcodeado
// FALTA: hacer petición al back.
import Lanzallamas from '/Lanzallamas.png?url'
import Dorso1 from '/Dorso.png?url'
import Dorso2 from '/Dorso.png?url'
import Dorso3 from '/Dorso.png?url'
import Dorso4 from '/Dorso.png?url'

//NOTA: Los nombres deben ser diferentes.
const imagenes_importadas = [Lanzallamas, Dorso1 , Dorso2, Dorso3, Dorso4]

function App() {
  return (
    <div>
      <Mano imagenes_cartas={imagenes_importadas}></Mano>
    </div>
  )
}

export default App
