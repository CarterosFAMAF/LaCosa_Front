import TestRenderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest'
import Carta from '../jugador/carta/Carta';

describe("Carta Test", () => {

    test("Renderiza Carta", () => {
        const elem = TestRenderer.create(<Carta></Carta>).toJSON()
        expect(elem).not.toBeNull
    })

})