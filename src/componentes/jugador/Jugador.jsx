// Componentes
import Mano from './mano/Mano'

import { useState } from 'react';
import RobarCarta from './robar/RobarCarta';

function Jugador() {
    const [esTurno, setEsTurno] = useState(true)
    const [robarCartaBool, setRobarCartaBool] = useState(true)
    
    return (
        <div>
            {esTurno?
                (robarCartaBool?
                    <RobarCarta
                        setRobarCartaBool={setRobarCartaBool}/>
                    : <Mano
                        setEsTurno={setEsTurno}/>)
                : null}
        </div>
    )
}

export default Jugador