import { configureStore } from "@reduxjs/toolkit";
import jugadorSlice from "./jugadorSlice";

export default configureStore({
  reducer: {
    jugador: jugadorSlice.reducer,
  },
});
