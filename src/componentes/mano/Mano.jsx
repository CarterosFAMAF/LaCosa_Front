import './Mano.css'
import Carta from "../carta/Carta";

function Mano({imagenes_cartas}) {
    const output = [];

    imagenes_cartas.forEach((imagen_carta, i) => {
        output.push(
            <li key={i}>
                <Carta imagen={imagen_carta} id={i}></Carta>
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