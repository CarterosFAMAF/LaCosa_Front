import "./listado_partidas.css";
import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Modal, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { listMatches } from "../../../store/jugadorSlice";
import { useSnackbar } from "notistack";
import UnirJugador from "../unir_Jugador/unir_jugador"


function ListadoPartidas() {
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
            <Button variant="contained" onClick={() => handleunir(partidaElem.match_id,partidaElem.match_name)} className="boton_unirse">
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

  const handleunir = async (match_id, match_name) => {
    setOpen(true)
    const formatoPartida = {
        partidaId: match_id,
        partidaNombre: match_name
    };
    dispatch(listMatches(formatoPartida));

  }
}
console.log(output);

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
      <Modal open={open}>
        <Box className="modal_listar">
          <UnirJugador/>
          <Button variant="contained" onClick={() => setOpen(false)} className="boton_cancelar"> cancelar </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ListadoPartidas;