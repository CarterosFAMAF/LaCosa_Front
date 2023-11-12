import { Provider } from "react-redux";
import store from "../../store/store"
import CrearPartida from "../home/crear_partida/crear_partida";
import { describe, expect, test, vi, afterEach  } from "vitest";
import {fireEvent, render, screen, cleanup, waitFor, within } from '@testing-library/react';
import { Container, TextField, Button } from "@mui/material";
import {userEvent} from "@testing-library/user-event"
import { SnackbarProvider } from "notistack";
import axios from 'axios';


describe("Crear Partida Test", () => {

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  })

  test("Caso donde falta completar campos y luego los completa", async () => {

    vi.mock('axios');
    axios.post.mockResolvedValue({
      data: {
          owner_id:3,
          match_id:2
      },
    });
    render(
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
          }}
        >
          <CrearPartida/>
        </SnackbarProvider>
      </Provider>
    );

    const textNombrePartida = screen.queryByRole('textbox', { name: "Nombre de partida"})
    expect(textNombrePartida).toBeTruthy();
    const textNombreJugador = screen.queryByRole('textbox', { name: "Nombre de jugador"});
    expect(textNombreJugador).toBeTruthy();
    expect(screen.queryByText("Minimo de jugadores")).toBeTruthy();
    expect(screen.queryByText("Maximo de jugadores")).toBeTruthy();

    expect(screen.queryByTestId('max-players-select')).toBeTruthy();
    expect(screen.queryByTestId('min-players-select')).toBeTruthy();  

    const button = screen.queryByRole("button", { name: "Crear Partida"});
    await userEvent.click(button);
    expect(button).toBeTruthy();
   
    const alertError = screen.queryByText("Todos los campos son necesarios!");
    expect(alertError).toBeTruthy();

    await userEvent.type(textNombrePartida, 'Fiesta');
    await userEvent.type(textNombreJugador, 'Ernesto');
    await userEvent.click(button);

    const alertSucess = screen.queryByText(`Se creo la partida con exito. Su ID de usuario es: 3. Su ID de partida: 2`);
    expect(alertSucess).toBeTruthy();
  });
});
