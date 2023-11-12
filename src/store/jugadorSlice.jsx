import { createSlice } from "@reduxjs/toolkit";
// Deben ser iguales a los strings en rolesSlice
const COSA_STR = "La_Cosa";
const HUMANO_STR = "Humano";
const INFECCION_STR = "Infectado";

export const jugadorSlice = createSlice({
  name: "jugador",
  initialState: {
    id: "",
    nombre: "",
    partidaId: -1,
    partidaNombre: "",
    unido: false,
    creador: false,
    iniciada: false,
    vivo: true,
    rol: "",
    turnoPartida: 0,
    posicion: -1,
    fase: 0,
    jugadores: [],
    cartas: [],
    seleccion: -1,
    seleccionType: "",
    cartasPublicas: [],
    intercambiante: 0,
    cosaId: 0,
    opcionesDefensivas: [],
    atacanteId: 0,
    atacanteCardId: 0,
    cuarentenas: [],
    chat: [],
    mensaje_finalizar: "No hubo ganadores!",
    maxJugadores: 12,
    minJugadores: 4,
  },
  reducers: {
    partidaDef: (state, action) => {
      state.maxJugadores = action.payload.maxJugadores;
      state.minJugadores = action.payload.minJugadores;
    },
    verPartida: (state, action) => {
      state.partidaId = action.payload.partidaId;
      state.partidaNombre = action.payload.partidaNombre;
    },
    unirPartida: (state, action) => {
      state.id = action.payload.id;
      state.nombre = action.payload.nombre;
      state.partidaId = action.payload.partidaId;
      state.partidaNombre = action.payload.partidaNombre;
      state.unido = action.payload.unido;
      state.creador = action.payload.creador;
    },
    iniciarPartida: (state) => {
      state.iniciada = true;
    },
    salirPartida: (state) => {
      state.id = "";
      state.nombre = "";
      state.partidaId = -1;
      state.partidaNombre = "";
      state.unido = false;
      state.creador = false;
      state.iniciada = false;
      state.vivo = true;
      state.rol = "";
      state.turnoPartida = 0;
      state.posicion = -1;
      state.fase = 0;
      state.jugadores = [];
      state.cartas = [];
      state.seleccion = -1;
      state.seleccionType = "";
      state.cartasPublicas = [];
      state.intercambiante = 0;
      state.cosaId = 0;
      state.opcionesDefensivas = [];
      state.atacanteId = 0;
      state.atacanteCardId = 0;
      state.cuarentenas = [];
      state.chat = [];
      state.mensaje_finalizar = "No hubo ganadores!";
      state.maxJugadores = 12;
      state.minJugadores = 4;
    },
    setJugadores: (state, action) => {
      const me_player = action.payload.filter(player => (player.id === state.id))[0];
      state.posicion = me_player ? me_player.turn : -1;
      state.vivo = me_player ? me_player.alive : true;
      state.jugadores = action.payload;
    },
    setTurnoPartida: (state, action) => {
      state.turnoPartida = action.payload;
    },
    setFase: (state, action) => {
      /*
      Robar Carta: Fase 0
      Elegir Carta (Jugar): Fase 1
      Elegir Objetivo: Fase 2
      Elegir Carta (Defensa): Fase 3
      Ver Resultado de Carta: Fase 4
      Elegir Carta (Intercambio): Fase 5
      */
      state.fase = action.payload;
    },
    pedirMano: (state, action) => {
      state.cartas = action.payload;
      if (action.payload.some(card => card.type === COSA_STR)) {
        state.rol = COSA_STR;
      } else {
        state.rol = HUMANO_STR;
      }
    },
    seleccionar: (state, action) => {
      state.seleccion = action.payload.id;
      state.seleccionType = action.payload.type;
    },
    tirarCarta: (state, action) => {
      state.cartas = state.cartas.filter(item => item.id !== action.payload);
    },
    robarCarta: (state, action) => {
      state.cartas.push(action.payload);
    },
    limpiarSelector: (state) => {
      state.seleccion = -1;
      state.seleccionType = "";
    },
    setIntercambiante: (state, action) => {
      state.intercambiante = action.payload;
    },
    setInfectado: (state, action) => {
      state.rol = INFECCION_STR;
      state.cosaId = action.payload;
    },
    setOpcionesDefensivas: (state, action) => {
      state.opcionesDefensivas = action.payload;
    },
    setAtacante: (state, action) => {
      state.atacanteId = action.payload.player_id;
      state.atacanteCardId = action.payload.card_main_id;
    },
    limpiarAtacante: (state) => {
      state.atacanteId = 0;
      state.atacanteCardId = 0;
    },
    setCartasPublicas: (state, action) => {
      state.cartasPublicas = action.payload;
    },
    addMessage: (state, action) => {
      state.chat.push(action.payload);
    },
    setMensajeFinalizar: (state, action) => {
      state.mensaje_finalizar = action.payload;
    },
  },
});

export const { verPartida, unirPartida, salirPartida, partidaDef, iniciarPartida, setJugadores,
  setTurnoPartida, setInfectado, pedirMano, seleccionar, robarCarta, tirarCarta, limpiarSelector,
  setFase, setCartasPublicas, setIntercambiante, setMensajeFinalizar, setAtacante,
  limpiarAtacante, setOpcionesDefensivas, addMessage } = jugadorSlice.actions;

export default jugadorSlice;
