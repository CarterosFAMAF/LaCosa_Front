import { configureStore } from "@reduxjs/toolkit";
import jugadorSlice from "./jugadorSlice";
import faseSlice from "./faseSlice";

export default configureStore({
  reducer: {
    jugador: jugadorSlice.reducer,
    fase: faseSlice.reducer,
  },
});
