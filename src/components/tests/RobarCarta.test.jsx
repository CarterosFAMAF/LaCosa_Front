import { Provider } from "react-redux";
import { describe, expect, test, vi, afterEach} from "vitest";
import {render, screen, cleanup, waitFor } from '@testing-library/react';
import {userEvent} from "@testing-library/user-event"
import { SnackbarProvider } from "notistack";
import configureStore from "redux-mock-store";
import axios from 'axios';

import RobarCarta from "../partida/robar/RobarCarta";


const mockStore = configureStore([]);
describe("RobarCarta Test", () => {

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  })

  test("Should render an alert displaying an error", async () => {
    const initialState = {
      jugador: {
        partidaID: 3,
        id: 2,
      }
    };
    const store = mockStore(initialState);
    vi.mock('axios');
    axios.get.mockResolvedValue({
        error: 'Simulated error',
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
          <RobarCarta/>
        </SnackbarProvider>
      </Provider>
    );
 
  const button = screen.getByText("Robar");
  expect(button).toBeTruthy();
  await userEvent.click(button);
  const alerta = screen.findByRole("alert");
  expect(alerta).toBeTruthy();
  });

  test("Should be working", async () => {


    const initialState = {
      jugador: {
        partidaID: 3,
        id: 2,
      }
    };
    const store = mockStore(initialState);

    vi.mock('axios');
    axios.get.mockResolvedValue({
      data: {
        respuesta: "random"
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
          <RobarCarta/>
        </SnackbarProvider>
      </Provider>
    );

    const button = screen.queryByRole('button', { name: "Robar"});
    expect(button).toBeTruthy();

    await userEvent.click(button);
    const alerta = screen.queryByRole("alert");
    expect(alerta).toBeTruthy();
    
    expect(screen.queryByRole('button')).toBeFalsy();
  });

  

});
