import { createSlice } from "@reduxjs/toolkit";

export const faseSlice = createSlice({
  name: "fase",
  initialState: {
    robo: 0,
    juego: 1,
    objetivo: 2,
    defensa: 3,
    resultado: 4,
    intercambio: 5,
  },
  reducers: {
  },
});

export const {} = faseSlice.actions;

export default faseSlice;
