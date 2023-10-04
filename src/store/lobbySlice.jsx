import { createSlice } from "@reduxjs/toolkit";

export const lobbySlice = createSlice({
  name: "lobby",
  initialState: {
    maxJugadores: 14,
    minJugadores: 4,
    jugadores: [],
  },
  reducers: {
    lobbyDef: (state, action) => {
      state.maxJugadores = action.payload.maxJugadores;
      state.minJugadores = action.payload.minJugadores;
    },
    setJugadores: (state, action) => {
      state.jugadores = action.payload;
    },
  },
});

export const { lobbyDef, setJugadores } = lobbySlice.actions;

export default lobbySlice;
