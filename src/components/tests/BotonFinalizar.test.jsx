import { describe, expect, test, afterEach } from "vitest";
import { Provider } from "react-redux";
import BotonFinalizar from "../partida/boton_finalizar/BotonFinalizar";
import {render, screen, cleanup } from '@testing-library/react';
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
describe("BotonFinalizar Test", () => {
  afterEach(() => {
    cleanup();
  })

  test("Deberia renderizar boton", async () => {
    const initialState = {
      jugador: {
        rol: "lacosa"
      },
      rol: {
        lacosa: "lacosa"
      }
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
          <BotonFinalizar/>
      </Provider>
    );

    expect(screen.queryByRole("button")).toBeTruthy();
  })
  test("No Deberia renderizar boton", async () => {
    const initialState = {
      jugador: {
        rol: "jugador"
      },
      rol: {
        lacosa: "lacosa"
      }
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
          <BotonFinalizar/>
      </Provider>
    );
    expect(screen.queryByRole("button")).toBeFalsy();
  })
});
