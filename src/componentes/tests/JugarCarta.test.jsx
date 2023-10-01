import TestRenderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest'
import JugarCarta from '../jugador/jugar/JugarCarta';

describe("JugarCarta Test", () => {

    test("Renderiza JugarCarta", () => {
        const elem = TestRenderer.create(<JugarCarta></JugarCarta>).toJSON()
        expect(elem).not.toBeNull
    })

})