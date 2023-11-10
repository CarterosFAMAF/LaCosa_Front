import { createSlice } from "@reduxjs/toolkit";

export const typecardSlice = createSlice({
  name: "typecard",
  initialState: {
    accion: "Accion",
    defensa: "Defensa",
    panico: "Panico",
    lacosa: "La_Cosa",
    infectado: "Infectado",
  },
  reducers: {
  },
});

export const {} = typecardSlice.actions;

export default typecardSlice;
