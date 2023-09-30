import axios from 'axios';
import './Lanzallamas.css'
import {
    TextField,
    Button,
    Container,
    Select,
    MenuItem
  } from "@mui/material";

//import desde el back
const players = [
    {
        id: 1,
        name: "Nay",
        life: true,
        turn: 1
    },
    {
        id: 2,
        name: "Mateo",
        life: true,
        turn: 2
    },
    {
        id: 3,
        name: "Facu",
        life: true,
        turn: 3
    }
]

function Lanzallamas({mi_id, mi_turno, carta_id, setTurno, setCartas}){

    const jugarLanzallamas = {
        jugador_id: "",
        carta_id: "",
        jugador_objetivo_id: ""
    };

    const tirar_lazallamas = async (event, jugador_objetivo_id) => {
        jugarLanzallamas.jugador_objetivo_id = jugador_objetivo_id;
        jugarLanzallamas.carta_id = carta_id;
        jugarLanzallamas.jugador_id = mi_id;

        event.preventDefault();
        /*
        PEDIDO AL BACK COMENTADO HASTA QUE ANDE
        
        const url = 'http://127.0.0.1:8000/matchs';
        axios.post(url, jugarLanzallamas)
        .then(function (response) {
            console.log(response);
            alert(`${jugarLanzallamas.jugador_objetivo_id} MURIO INCINERADO!`);
            setCartas(oldArray => (oldArray.filter(item => item.id !== id_carta)));
            setTurno(turnoViejo => turnoViejo+1)
        })
        .catch(function (response) {
            //handle error
            alert(`error: ${response.message}`);
        });
        */

        // BORRAR UNA VEZ DESCOMENTADO LO DE ARRIBA
        alert(`${jugarLanzallamas.jugador_objetivo_id} MURIO INCINERADO!`);
        setCartas(oldArray => (oldArray.filter(item => item.id !== id_carta)));
        setTurno(turnoViejo => turnoViejo+1)
    }

    const output = [];

    players.forEach(player => {
        //FALTA CORREGIR LOS JUGADORES ADYACENTES (TURNOS)
        if(mi_turno+2 === player.turn || mi_turno+1 === player.turn){
            output.push(
                <li key={player.id}>
                    <button className='elegir_jugador' onClick={(event) => tirar_lazallamas(event, player.id)}> {player.name} </button>
                </li>
            );
        }
    });

    return(
        // CORREGIR ESTILO DE BOTONES ADYACENTES
        <div className='lanzallamas'> 
            {output}
        </div>
    )
}

export default Lanzallamas;