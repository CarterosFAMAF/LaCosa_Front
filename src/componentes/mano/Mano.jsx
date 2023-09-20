import './Mano.css'

import JugarCarta from '../jugar/JugarCarta';
import Carta from "../carta/Carta";
import { useState } from 'react';

function Mano({cartas}) {
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
        <div className='mano'>
            {mostrarJugarCarta && <JugarCarta id_carta={seleccion}/>}
            {output}
        </div>
    )
}

export default Mano