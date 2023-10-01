import './Mano.css'

import Carta from "../carta/Carta";

function Mano({cartas, seleccion, setSeleccion}) {
    const output = [];

    cartas.forEach(carta => {
        output.push(
            <li key={carta.id}>
                <Carta
                    id={carta.id}
                    imagen={carta.imagen}
                    brillo={(carta.id === seleccion)? 1 : 0}
                    setSeleccion={setSeleccion}>   
                </Carta>
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