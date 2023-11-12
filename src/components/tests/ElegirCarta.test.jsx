import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ElegirCarta from "../partida/elegir_carta/ElegirCarta";
import { describe, expect, test } from "vitest";

const mockStore = configureStore([]);

describe("ElegirCarta Test", () => {
  test("Renderiza ElegirCarta", () => {
    const initialState = {
      jugador: {
        cartas: [
          { id: 1, name: "lanzallamas" },
          { id: 2, name: "Mas_Vale_Que_Corras" },
          { id: 3, name: "Sospecha" },
        ],
        turnoPartida: 0,
        fase: 1,
        seleccion: 1,
        jugadores: [
          { id: 5, name: 'Ernesto', turn: 0, alive: true },
          { id: 6, name: 'Gustavo', turn: 1, alive: true },
          { id: 8, name: 'Juan Carlos', turn: 2, alive: true },
          { id: 7, name: 'Elena', turn: 3, alive: true },
        ],
      },
      fase: {
        robo: 0,
        juego: 1,
        objetivo: 2,
        defensa: 3,
        resultado: 4,
        intercambio: 5,
      },
      typecard: {
        accion: "Accion",
        defensa: "Defensa",
        panico: "Panico",
        lacosa: "La_Cosa",
        infectado: "Infectado",
      },
      rol: {
        lacosa: "La_Cosa",
        humano: "Humano",
        infectado: "Infectado",
      }
    };

    const store = mockStore(initialState);

    const elem = TestRenderer.create(
      <Provider store={store}>
        <ElegirCarta />
      </Provider>
    ).toJSON();

    expect(elem).not.toBeNull();
  });
});