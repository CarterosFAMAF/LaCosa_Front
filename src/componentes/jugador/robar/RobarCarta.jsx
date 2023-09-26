import './RobarCarta.css'

import Carta from '../carta/Carta'
import {useEffect, useState} from 'react'

//Petición al Back simulada.
import Lanzallamas2 from '/Lanzallamas.png?url'
const carta = {id: 4, imagen: Lanzallamas2}

function RobarCarta({setRobarCartaBool}) {

    const [mostrarCarta, setMostrarCarta] = useState(false)
    const [showTimer, setShowTimer] = useState(5000)

    useEffect(() => {
        setTimeout(() => {
            setRobarCartaBool(false)
        }, showTimer);
    }, [showTimer, setShowTimer])

    const skip_show_timer = () => {
        setShowTimer(0)
    }

    const robo_carta = () => {
        console.log(`Hacer petición al back de robar carta`)
        setMostrarCarta(true)
    }

    return (
        <div key={mostrarCarta}>
            {mostrarCarta ?
                <Carta className="carta"
                    select_card_method={skip_show_timer}
                    imagen={carta.imagen}
                    id={carta.id}
                    brillo={0}>
                </Carta>
                : <button className="robar_carta" onClick={() => robo_carta()}>Robar</button>}
        </div>
    )
}

export default RobarCarta