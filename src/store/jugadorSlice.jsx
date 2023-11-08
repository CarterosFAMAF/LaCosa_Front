import { createSlice } from "@reduxjs/toolkit";

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
    posicion: -1,
    fase: 0,
    cartas: [],
    cartasPublicas: [],
    turnoPartida: 0,
    seleccion: -1,
    jugadores: [],
    intercambiante: 0,
    maxJugadores: 14,
    minJugadores: 4,
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
      state.posicion = -1;
      state.fase = 0;
      state.cartas = [];
      state.turnoPartida = 0;
      state.seleccion = -1;
      state.intercambiante = 0;
      state.maxJugadores = 14;
      state.minJugadores = 4;
    },
    setJugadores: (state, action) => {
      state.jugadores = action.payload;
    },
    setTurno: (state, action) => {
      state.turnoPartida = action.payload.turnoPartida;
      state.posicion = action.payload.posicion;
      state.vivo = action.payload.vivo;
    },
    pedirMano: (state, action) => {
      state.cartas = action.payload;
    },
    robarCarta: (state, action) => {
      state.cartas.push(action.payload);
      state.fase++;
    },
    seleccionar: (state, action) => {
      state.seleccion = action.payload;
    },
    limpiarSelector: (state) => {
      state.seleccion = -1;
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
      // Cuando termina turno: fase = 0.
      state.fase = action.payload;
    },
    setCartasPublicas: (state, action) => {
      state.cartasPublicas = action.payload;
    },
    setIntercambiante: (state, action) => {
      state.intercambiante = action.payload;
    },
    setFaltanteFinalizar: (state, action) => { 
      state.faltanteFinalizar = action.payload;
    },
  },
});

export const { verPartida, unirPartida, salirPartida, partidaDef, iniciarPartida, setJugadores,
  setTurno, pedirMano, seleccionar, robarCarta, tirarCarta, limpiarSelector, setFase,
  setCartasPublicas, setIntercambiante, setFaltanteFinalizar } = jugadorSlice.actions;

export default jugadorSlice;
