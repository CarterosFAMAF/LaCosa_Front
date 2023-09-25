import "./Home.css"

const Home = ({nombre}) => {
  return(
    <div>
      <div className="container">

        <header className="titulo">
          <h1>La Cosa Web</h1>
          <h2>¡Bienvenido {nombre}!</h2>
        </header>

        <div className="clearFix"></div>
        
        <section className="crearPartida"> 
          <aside>
            <h3>Crear partida</h3>
            <form>
              <input type="submit" value="Crear partida"/>
            </form>
          </aside>
        </section>

        <div className="clearFix"></div>
        
        <section className="unirsePartida"> 
          <aside>
            <h3>Unirse a partida</h3>
            <form>
              <input type="text" placeholder="id de partida"/>
              <input type="submit" value="Unirse"/>
            </form>
          </aside>
        </section>

      </div>
    </div>
  )
}

export default Home