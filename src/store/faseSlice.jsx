import { createSlice } from "@reduxjs/toolkit";

export const faseSlice = createSlice({
  name: "fase",
  initialState: {
    espera: 0,
    robo: 1,
    juego: 2,
    objetivo: 3,
    defensa: 4,
    resultado: 5,
    intercambio: 6,
  },
  reducers: {
  },
});

export const {} = faseSlice.actions;

export default faseSlice;
