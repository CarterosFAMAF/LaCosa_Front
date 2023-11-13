import { createSlice } from "@reduxjs/toolkit";

export const typemessageSlice = createSlice({
  name: "typemessage",
  initialState: {
    user: 0,
    system: 1,
    infeccion: 2,
    defense: 3,
    quarantine: 4,
    panico: 5,
  },
  reducers: {
  },
});

export const {} = typemessageSlice.actions;

export default typemessageSlice;
