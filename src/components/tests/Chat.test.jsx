import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../store/store"
import Chat from "../chat/Chat";


import { describe, expect, test, vi, afterEach} from "vitest";
import {render, screen, cleanup, waitFor } from '@testing-library/react';
import {userEvent} from "@testing-library/user-event"
import { SnackbarProvider } from "notistack";
import axios from 'axios';
import configureStore from "redux-mock-store";

const initialState = {
  jugador: {
    partidaId : 3,
    id: 2,
    chat: [{ id: 1, type:'1', text: "Sistema"}, {id: 0,owner: "Ernesto", type:'0', text: "Usuario"}]},
  typemessage: {
    user: 0,
    system: 1,
    infeccion: 2,
    defense: 3,
    quarantine: 4
  },
}
describe("Chat Test", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  })

  test("Renderiza Chat", async () => {
    vi.mock('axios');
    axios.post.mockResolvedValue({
      data: {
        id: 1,
        type:'0',
        text: "perfecto",
      }});

    const mockStore = configureStore([]);

    const store = mockStore(initialState);
    render(<Provider store={store}><Chat/></Provider>);

    // chat esta abierto
    const chat = screen.queryByTestId("chat");
    expect(chat).toBeTruthy()
    expect(chat.classList.contains('modal_chat')).toBe(true);


    // boton de abrir no aparece
    const abrirChatIconButton = screen.queryByTestId("abrir_chat");
    expect(abrirChatIconButton).toBeTruthy()
    expect(abrirChatIconButton.classList.contains('hidden')).toBe(true);


    const cerrar_chat = screen.queryByTestId("cerrar_chat");
    const textField = screen.queryByRole('textbox');

    expect(screen.queryByTestId("enviar_mensaje")).toBeTruthy()
    var filtro1 = screen.queryByTestId("filtro1");
    var filtro2 = screen.queryByTestId("filtro2");

    expect(filtro2).toBeTruthy();
    expect(filtro1).toBeFalsy();


    const regex = new RegExp(('> Sistema').replace(/ /g, '\\s*'));
    const regex2 = new RegExp(('Ernesto : Usuario').replace(/ /g, '\\s*'));

    expect(screen.queryByText(regex)).toBeTruthy();
    expect(screen.queryByText(regex2)).toBeTruthy();

    // filter
    await userEvent.click(filtro2)
    expect(filtro1 = screen.queryByTestId("filtro1")).toBeTruthy()
    expect(filtro1 = screen.queryByTestId("filtro2")).toBeFalsy()
    
    expect(screen.queryByText(regex)).toBeTruthy();
    expect(screen.queryByText(regex2)).toBeFalsy();

    // testing endpoint
    await userEvent.type(textField, 'HOLA');
    await userEvent.type(textField, '{enter}');


    // closing chat
    const cerrarChatIconButton = screen.queryByTestId("cerrar_chat");
    expect(cerrarChatIconButton).toBeTruthy()
    
    await userEvent.click(cerrarChatIconButton)

    const chat2 = screen.queryByTestId("chat");
    expect(chat2).toBeTruthy()
    expect(chat2.classList.contains('modal_chat')).toBe(false);

  });
});
