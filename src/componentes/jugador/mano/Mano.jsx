import './Mano.css'

import { useState } from 'react';

import Carta from "../carta/Carta";
import JugarCarta from '../jugar/JugarCarta';

// Petición al Back simulado 
import Lanzallamas from '/Lanzallamas.png?url'
import Dorso1 from '/Dorso.png?url'
import Dorso2 from '/Dorso.png?url'
import Dorso3 from '/Dorso.png?url'
import Lanzallamas2 from '/Lanzallamas.png?url'

const cartas = [
    {id: 0, imagen: Lanzallamas},
    {id: 1, imagen: Dorso1},
    {id: 2, imagen: Dorso2},
    {id: 3, imagen: Dorso3},
    {id: 4, imagen: Lanzallamas2}]

function Mano({setEsTurno}) {
    const output = [];

    const [seleccion, setSeleccion] = useState(-1)
    const [mostrarJugarCarta, setMostrarJugarCarta] = useState(false)

    const select_card = (id_card) => {
        setSeleccion(id_card);
        setMostrarJugarCarta(true);
    }

    cartas.forEach(carta => {
        output.push(
            <li key={carta.id}>
                <Carta
                    select_card_method={select_card}
                    imagen={carta.imagen}
                    id={carta.id}
                    brillo={(carta.id === seleccion)? 1 : 0}>   
                </Carta>
            </li>
        );
    });

    return (
        <div>
            {mostrarJugarCarta && <JugarCarta id_carta={seleccion} setEsTurno={setEsTurno}/>}
            <div className='mano'>
                {output}
            </div>
        </div>
    )
}

export default Mano