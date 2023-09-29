// Componentes
import Mano from './mano/Mano'

import { useState } from 'react';
import RobarCarta from './robar/RobarCarta';
import JugarCarta from './jugar/JugarCarta';

// Petición al Back simulado 
import Lanzallamas from '/Lanzallamas.png?url'
import Dorso1 from '/Dorso.png?url'
import Dorso2 from '/Dorso.png?url'
import Dorso3 from '/Dorso.png?url'

const cartas_import = [
    {id: 0, imagen: Lanzallamas},
    {id: 1, imagen: Dorso1},
    {id: 2, imagen: Dorso2},
    {id: 3, imagen: Dorso3}]

function Jugador() {
    const [cartas, setCartas] = useState(cartas_import)
    const [esTurno, setEsTurno] = useState(true)
    const [faseRobo, setFaseRobo] = useState(true)
    const [seleccion, setSeleccion] = useState(-1)

    return (
        <div>
            {esTurno?
                <div>
                    <Mano
                        cartas={cartas}
                        seleccion={seleccion}
                        setSeleccion={setSeleccion}/>
                    {faseRobo?
                        <RobarCarta
                            setFaseRobo={setFaseRobo}
                            setCartas={setCartas}/>
                        : <div>
                            {(seleccion !== -1)?
                                <JugarCarta
                                    id_carta={seleccion}
                                    setEsTurno={setEsTurno}
                                    setCartas={setCartas}/>
                                : null
                            }
                        </div>
                    }
                </div>
                : null}
        </div>
    )
}

export default Jugador