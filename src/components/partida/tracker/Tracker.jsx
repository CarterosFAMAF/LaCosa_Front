import "./Tracker.css";
import { useSelector } from "react-redux";

function Tracker() {
  const jugador = useSelector((state) => state.jugador);
  const jugador_en_turno = jugador.jugadores.filter(player => (player.turn === jugador.turnoPartida))[0];
  
  const output = [];
  jugador.jugadores.map((player) => {  
    const yo_style = (jugador.id === player.id) ? { color: `blue` } : {};
    const turno_style = jugador_en_turno ? (jugador_en_turno.id === player.id ? {border: `5px double green`} : {}) : {}
    
    output.push(
      <li key={player.id} style={Object.assign(yo_style, turno_style)}>
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