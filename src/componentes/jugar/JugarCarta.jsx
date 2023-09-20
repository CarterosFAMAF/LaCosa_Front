import './JugarCarta.css'

function JugarCarta({id_carta}) {

    const jugar_carta = (id_carta) => {
        console.log(`Hacer petición al back de tirar la carta ${id_carta}`)
    }

    return (
        <div className="botones_juego">
            <button className="jugar" onClick={() => jugar_carta(id_carta)}>Jugar</button>
        </div>
    )
}

export default JugarCarta