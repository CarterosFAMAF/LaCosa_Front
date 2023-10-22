import "./listado_partidas.css";
import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Modal, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { verPartida } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";
import UnirJugador from "../unir_Jugador/unir_jugador"


function ListadoPartidas() {
  const jugador = useSelector((state) => state.jugador);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false)
  const [output, setOutput] = useState([]);

  const handleRefresh = async (event) => {
    const url = `http://127.0.0.1:8000/matches`;
    axios
      .get(url)
      .then(function (response) {
        const updatedOutput = response.data.map((partidaElem) => (
          <li key={partidaElem.match_id} className="listapartidas">
            <br></br>
            <hr></hr>
            <Typography className="partidas">
              {partidaElem.match_name}
            </Typography>
            <Typography className="jugadores">
              {"Jugadores: (" + partidaElem.player_count + "/" + partidaElem.player_max + ")"}
            </Typography>
            <Button variant="contained" onClick={() => handler(true, partidaElem.match_id,partidaElem.match_name)} className="boton_unirse">
              unirse
            </Button>
            <br></br>
          </li>
        ));
        setOutput(updatedOutput);
      })
      .catch(function (response) {
        enqueueSnackbar(`error: ${response.message}`, {
          variant: "error",
        });
      });
  }
  const handler = async (joining, match_id, match_name) => {
    setOpen(joining)
    const formatoPartida = {
        partidaId: match_id,
        partidaNombre: match_name
    };
    dispatch(verPartida(formatoPartida));
  }
  return (
    <Container className="listar_partidas">
      <div className="componentes">
        <h2> 
          Listado de Partidas
        </h2>
        <Button variant="contained" onClick={handleRefresh} className="boton_actualizar">
          Actualizar Listado
        </Button>
      </div>
      {output}
      <Modal open={jugador.partidaId != -1 && open}>
        <Box className="modal_partida">
          <UnirJugador/>
          <Button variant="contained" onClick={() => handler(false,-1,"")} className="boton_cancelar"> cancelar </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ListadoPartidas;