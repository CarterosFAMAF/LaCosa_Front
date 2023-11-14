import { Provider } from "react-redux";
import store from "../../store/store"
import UnirJugador from "../home/unir_Jugador/unir_jugador";
import { describe, expect, test, vi, afterEach} from "vitest";
import {render, screen, cleanup, waitFor } from '@testing-library/react';
import {userEvent} from "@testing-library/user-event"
import { SnackbarProvider } from "notistack";
import axios from 'axios';

describe("Unir Jugador Test", () => {

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  })

  test("Should ask you to specify an username", async () => {
    render(
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
          }}
        >
          <UnirJugador/>
        </SnackbarProvider>
      </Provider>
    );
    const boton = screen.queryByText("Unirse");
    expect(boton).toBeTruthy();
    await userEvent.click(boton);
 
    // Verificar que este el snackbar con el error
    await waitFor(() => screen.queryByRole('alert'));
    const alertElement = screen.queryByText("Es necesario especificar un nombre de usuario!");
    expect(alertElement).toBeTruthy();

    // Verificar que el textfield tenga un error
    const textField = screen.queryByText('El campo es Requerido')
    expect(textField).toBeTruthy();

  });
  

  test("Should send a request to the backend", async () => {
    vi.mock('axios');
    axios.post.mockResolvedValue({
      data: {
        match_name: 'partidasa',
        player_id: 2,
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
          <UnirJugador/>
        </SnackbarProvider>
      </Provider>
    );

    const textField = screen.queryByRole('textbox')
    expect(textField).toBeTruthy();
    await userEvent.type(textField, 'ernesto');


    const boton = screen.queryByText("Unirse");
    expect(boton).toBeTruthy();
    await userEvent.click(boton);

    const alertElement = screen.queryByText("Te uniste a la partida con Nombre: partidasa, tu ID de Jugador es: 2");

    expect(alertElement).toBeTruthy(); 
  });
  
});
