import { configureStore } from "@reduxjs/toolkit";
import jugadorSlice from "./jugadorSlice";
import lobbySlice from "./lobbySlice";

export default configureStore({
  reducer: {
    jugador: jugadorSlice.reducer,
    lobby: lobbySlice.reducer,
  },
});
