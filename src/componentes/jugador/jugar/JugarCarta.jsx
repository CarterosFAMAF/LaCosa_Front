import './JugarCarta.css'

function JugarCarta({id_carta, setEsTurno, setCartas}) {

    const jugar_carta = (id_carta) => {
        console.log(`Hacer petición al back de jugar la carta ${id_carta}`)
        setCartas(oldArray => (oldArray.filter(item => item.id !== id_carta)));
        setEsTurno(false)
    }

    const descartar_carta = (id_carta) => {
        console.log(`Hacer petición al back de descartar la carta ${id_carta}`)
        setCartas(oldArray => (oldArray.filter(item => item.id !== id_carta)));
        setEsTurno(false)
    }

    return (
        <div className="botones_juego">
            <button className="descartar" onClick={() => descartar_carta(id_carta)}>Descartar</button>
            <button className="jugar" onClick={() => jugar_carta(id_carta)}>Jugar</button>
        </div>
    )
}

export default JugarCarta