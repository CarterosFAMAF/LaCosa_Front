import "./Home.css"

const Home = ({nombre}) => {
  return(
    <div>
      <div className="container">

        <header className="titulo">
          <h1>La Cosa Web</h1>
          <h2>¡Bienvenido!</h2>
        </header>

        <div className="clearFix"></div>
        
        <section className="crearPartida"> 
          <aside>
            <h3>Crear partida componente</h3>
          </aside>
        </section>

        <div className="clearFix"></div>

        <section className="unirsePartida"> 
          <aside>
            <h3>Unirse a partida componente</h3>
          </aside>
        </section>

      </div>
    </div>
  )
}

export default Home