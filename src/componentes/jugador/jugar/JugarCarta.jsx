import './JugarCarta.css'

function JugarCarta({id_carta, setEsTurno, setCartas}) {

    const jugar_carta = (carta_id) => {
        console.log(`Hacer petición al back de jugar la carta ${carta_id}`)
        setCartas(oldArray => (oldArray.filter(item => item.id !== carta_id)));
        setEsTurno(false)
    }

    const descartar_carta = (carta_id) => {
        console.log(`Hacer petición al back de descartar la carta ${carta_id}`)
        setCartas(oldArray => (oldArray.filter(item => item.id !== carta_id)));
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