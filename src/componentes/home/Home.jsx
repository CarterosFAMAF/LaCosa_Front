import "./Home.css"
import Unir_Jugador from "../unir_Jugador/unir_jugador"

function Home () {
  return(
    <div className="container">

      <header className="titulo">
        <h1>La Cosa Web</h1>
        <h2>¡Bienvenido!</h2>
      </header>
        
      <h3>Crear partida componente</h3>
            
      <Unir_Jugador />
      
    </div>
  )
}

export default Home