// Componentes
import Mano from '../mano/Mano'

// Petición al Back
import Lanzallamas from '/Lanzallamas.png?url'
import Dorso1 from '/Dorso.png?url'
import Dorso2 from '/Dorso.png?url'
import Dorso3 from '/Dorso.png?url'

const cartas = [
    {id: 0, imagen: Lanzallamas},
    {id: 1, imagen: Dorso1},
    {id: 2, imagen: Dorso2},
    {id: 3, imagen: Dorso3}]

function Jugador() {
    return (
        <div className='jugador'>
            <Mano
                cartas={cartas}>
            </Mano>
        </div>
    )
}

export default Jugador