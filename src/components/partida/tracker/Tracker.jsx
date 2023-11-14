import "./Tracker.css";
import { useSelector } from "react-redux";

function Tracker() {
  const jugador = useSelector((state) => state.jugador);
  const rol = useSelector((state) => state.rol);
  const jugador_en_turno = jugador.jugadores.filter(player => (player.turn === jugador.turnoPartida))[0];

  const output = [];
  jugador.jugadores.map((player) => {
    const yo_style = (jugador.id === player.id) ? ((jugador.rol === rol.infectado || jugador.rol === rol.lacosa) ? {color: 'green'} : { color: 'blue' }) : {};
    const turnoPartida_style = jugador_en_turno ? (jugador_en_turno.id === player.id ? { border: `5px double green` } : {}) : {}
    const muertos_style = (player.alive === false) ? { color: 'grey', fontWeight: 'normal'} : {};
    const cuarentena_style = (player.quarantine > 0) ? { backgroundColor: 'yellow'} : {};

    output.push(
      <li key={player.id} style={Object.assign(yo_style, turnoPartida_style, muertos_style, cuarentena_style)}>
        {player.name}
        {player.alive}
      </li>
    );
  });

  return (
    <div className="tracker">
      {output}
    </div>
  )
}

export default Tracker;