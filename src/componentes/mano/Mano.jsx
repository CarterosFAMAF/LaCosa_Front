import './Mano.css'
import Carta from "../carta/Carta";
import { useState } from 'react';

function Mano({imagenes_cartas}) {
    const output = [];
    const [seleccion, setSeleccion] = useState(imagenes_cartas.map(_ => 0))
    
    const select_card = (id_card) => {
        setSeleccion(seleccion.map((_, i) => (i === id_card)? 1 : 0));
    }

    imagenes_cartas.forEach((imagen_carta, i) => {
        output.push(
            <li key={i}>
                <Carta select_card_method={select_card} imagen={imagen_carta} id={i} brillo={seleccion[i]}></Carta>
            </li>
        );
    });

    return (
        <div className='mano'>
            {output}
        </div>
    )
}

export default Mano