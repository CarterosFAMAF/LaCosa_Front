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
    },
  },
});

export const { unirPartida, salirPartida } = jugadorSlice.actions;

export default jugadorSlice;
