import { createSlice } from "@reduxjs/toolkit";

export const jugadorSlice = createSlice({
  name: "jugador",
  initialState: {
    id: "",
    nombre: "",
    partidaId: "",
    partidaNombre: "",
    unido: false,
    creador: false,
    iniciada: false,
    turno: 0,
    fase: 0,
    cartas: [],
    turnoPartida: 0,
    seleccion: 0,
  },
  reducers: {
    unirPartida: (state, action) => {
      state.id = action.payload.id;
      state.nombre = action.payload.nombre;
      state.partidaId = action.payload.partidaId;
      state.partidaNombre = action.payload.partidaNombre;
      state.unido = action.payload.unido;
      state.creador = action.payload.creador;
    },
    salirPartida: (state) => {
      state.id = "";
      state.nombre = "";
      state.partidaId = "";
      state.partidaNombre = "";
      state.unido = false;
      state.creador = false;
      state.iniciada = false;
      state.turno = 0;
      state.fase = 0;
      state.cartas = [];
      state.turnoPartida = 0;
      state.seleccion = 0;
    },
    iniciarPartida: (state) => {
      state.iniciada = true;
    },
    pedirReparto: (state, action) => {
      // Probablemente separar estas 3 asignaciones en métodos distintos.
      state.turno = action.payload.turno;   // setTurno
      state.cartas = action.payload.cartas; // setCartas
      state.turnoPartida = action.payload.turnoPartida; // setTurnoPartida
    },
    seleccionar: (state, action) => {
      state.seleccion = action.payload;
    },
    robarCarta: (state, action) => {
      state.cartas.push(action.payload);
      state.fase++;
    },
    tirarCarta: (state, action) => {
      state.cartas = state.cartas.filter(item => item.id !== action.payload)
      state.fase = 0; // Cuando termina turno: fase = 0.
    },
  },
});

export const { unirPartida, salirPartida, iniciarPartida, pedirReparto, seleccionar, robarCarta, tirarCarta } =
  jugadorSlice.actions;

export default jugadorSlice;
