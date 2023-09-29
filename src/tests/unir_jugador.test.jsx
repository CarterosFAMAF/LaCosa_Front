import TestRenderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest'
import UnirJugador from '../componentes/unir_Jugador/unir_jugador'

describe("Unir Jugador Test", () => {

    test("Renderiza Unir Jugador", () => {
        const elem = TestRenderer.create(<UnirJugador></UnirJugador>).toJSON()
        console.log(elem)
        expect(elem).not.toBeNull
    })

})