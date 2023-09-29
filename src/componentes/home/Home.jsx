import "./Home.css"
import UnirJugador from "../unir_Jugador/unir_jugador"
import CrearPartida from "../crear_partida/crear_partida"

function Home () {
  return(
    <div className="container">

      <header className="titulo">
        <h1>La Cosa Web</h1>
        <h2>¡Bienvenido!</h2>
      </header>
      
      <CrearPartida/>

      <UnirJugador />
      
    </div>
  )
}

export default Home