import { configureStore } from "@reduxjs/toolkit";
import jugadorSlice from "./jugadorSlice";
import faseSlice from "./faseSlice";
import typecardSlice from "./typecardSlice";
import rolSlice from "./rolesSlice";
import typemessageSlice from "./typemessageSlice";

export default configureStore({
  reducer: {
    jugador: jugadorSlice.reducer,
    fase: faseSlice.reducer,
    typecard: typecardSlice.reducer,
    rol: rolSlice.reducer,
    typemessage: typemessageSlice.reducer,
  },
});
