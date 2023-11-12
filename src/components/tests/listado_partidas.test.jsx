import { Provider } from "react-redux";
import store from "../../store/store"
import { describe, expect, test, vi } from "vitest";
import {render, screen, cleanup } from '@testing-library/react';
import ListadoPartidas from "../home/listado_partidas/listado_partidas";
import { SnackbarProvider } from "notistack";
import userEvent from "@testing-library/user-event";
import axios from 'axios';


describe("listado_partidas Test", () => {
  test("Renderiza listado_partidas", async () => {

    vi.mock('axios');
    axios.get.mockResolvedValue({
      data: [ { 
        match_id: 1,
        match_name: "Fiesta",
        player_count: 2,
        player_max: 4,
      } ],
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
        <ListadoPartidas/>
      </SnackbarProvider>
    </Provider>);


    expect(screen.queryByText("Listado de Partidas")).toBeTruthy();
    const boton = screen.queryByText("Actualizar Listado");
    expect(boton).toBeTruthy();

    await userEvent.click(boton);
    expect(screen.queryByText("Fiesta")).toBeTruthy();
    expect(screen.queryByText("Jugadores: (2/4)")).toBeTruthy();

    const botonUnirse = screen.queryByText("unirse")
    expect(botonUnirse).toBeTruthy();
    await userEvent.click(botonUnirse);

    const botonSalirse = screen.queryByText("cancelar")
    expect(botonSalirse).toBeTruthy();
    await userEvent.click(botonSalirse);

    expect(screen.queryByText("cancelar")).toBeFalsy();

  });
});