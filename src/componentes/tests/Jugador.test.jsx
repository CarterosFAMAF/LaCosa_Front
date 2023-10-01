import TestRenderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest'
import Jugador from '../jugador/Jugador';

describe("Jugador Test", () => {

    test("Renderiza Jugador", () => {
        const elem = TestRenderer.create(<Jugador></Jugador>).toJSON()
        expect(elem).not.toBeNull
    })

})