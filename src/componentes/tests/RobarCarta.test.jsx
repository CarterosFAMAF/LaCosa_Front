import TestRenderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest'
import RobarCarta from '../jugador/robar/RobarCarta';

describe("RobarCarta Test", () => {

    test("Renderiza RobarCarta", () => {
        const elem = TestRenderer.create(<RobarCarta></RobarCarta>).toJSON()
        expect(elem).not.toBeNull
    })

})