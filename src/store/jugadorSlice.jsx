import { createSlice } from "@reduxjs/toolkit";
const COSA_STR = "La_Cosa";
const HUMANO_STR = "Humano";
const INFECCION_STR = "Infeccion";

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
    posicion: -1,
    fase: 0,
    cartas: [],
    cartasPublicas: [],
    turnoPartida: 0,
    seleccion: -1,
    seleccionType: "",
    jugadores: [],
    intercambiante: 0,
    cosaId: 0,
    atacanteId: 0,
    opcionesDefensivas: [],
    atacanteCardId: 0,
    maxJugadores: 14,
    minJugadores: 4,
    mensaje_finalizar: "No hubo ganadores!",
  },
  reducers: {
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
    partidaDef: (state, action) => {
      state.maxJugadores = action.payload.maxJugadores;
      state.minJugadores = action.payload.minJugadores;
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
      state.posicion = -1;
      state.fase = 0;
      state.cartas = [];
      state.cartasPublicas = [];
      state.turnoPartida = 0;
      state.seleccion = -1;
      state.seleccionType = "";
      state.jugadores = [];
      state.intercambiante = 0;
      state.cosaId = 0;
      state.atacanteId = 0;
      state.opcionesDefensivas = [];
      state.atacanteCardId = 0;
      state.maxJugadores = 14;
      state.minJugadores = 4;
      state.mensaje_finalizar = "No hubo ganadores!";
    },
    setJugadores: (state, action) => {
      const me_player = action.payload.filter(player => (player.id === state.id))[0];
      state.posicion = me_player.turn;
      state.vivo = me_player.alive;
      state.jugadores = action.payload;
    },
    setTurnoPartida: (state, action) => {
      state.turnoPartida = action.payload;
    },
    setInfectado: (state, action) => {
      state.rol = INFECCION_STR;
      state.cosaId = action.payload;
    },
    pedirMano: (state, action) => {
      state.cartas = action.payload;
      if (action.payload.some(card => card.type === COSA_STR)) {
        state.rol = COSA_STR;
      } else {
        state.rol = HUMANO_STR;
      }
    },
    robarCarta: (state, action) => {
      state.cartas.push(action.payload);
    },
    seleccionar: (state, action) => {
      state.seleccion = action.payload.id;
      state.seleccionType = action.payload.type;
    },
    limpiarSelector: (state) => {
      state.seleccion = -1;
      state.seleccionType = "";
    },
    tirarCarta: (state, action) => {
      state.cartas = state.cartas.filter(item => item.id !== action.payload);
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
    setCartasPublicas: (state, action) => {
      state.cartasPublicas = action.payload;
    },
    setIntercambiante: (state, action) => {
      state.intercambiante = action.payload;
    },
    setMensajeFinalizar: (state, action) => {
      state.mensaje_finalizar = action.payload;
    },
    setAtacante: (state, action) => {
      state.atacanteId = action.payload.player_id;
      state.atacanteCardId = action.payload.card_main_id;
    },
    limpiarAtacante: (state) => {
      state.atacanteId = 0;
      state.atacanteCardId = 0;
    },
    setOpcionesDefensivas: (state, action) => {
      state.opcionesDefensivas = action.payload;
    },
  },
});

export const { verPartida, unirPartida, salirPartida, partidaDef, iniciarPartida, setJugadores,
  setTurnoPartida, setInfectado, pedirMano, seleccionar, robarCarta, tirarCarta, limpiarSelector,
  setFase, setCartasPublicas, setIntercambiante, setMensajeFinalizar, setAtacante, limpiarAtacante,
  setOpcionesDefensivas } = jugadorSlice.actions;

export default jugadorSlice;
