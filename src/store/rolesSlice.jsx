import { createSlice } from "@reduxjs/toolkit";

export const rolSlice = createSlice({
  name: "rol",
  initialState: {
    // Deben ser iguales a los strings en jugadorSlice
    lacosa: "La_Cosa",
    humano: "Humano",
    infectado: "Infectado",
  },
  reducers: {
  },
});

export const {} = rolSlice.actions;

export default rolSlice;
