import TestRenderer from 'react-test-renderer';
import { describe, expect, test } from 'vitest'
import Mano from '../jugador/mano/Mano';

import Lanzallamas from '/Lanzallamas.png?url'

describe("Mano Test", () => {

    const cartas = [
        {id: 0, imagen: Lanzallamas}
    ]
    test("Renderiza Mano", () => {
        const elem = TestRenderer.create(<Mano cartas={cartas}></Mano>).toJSON()
        expect(elem).not.toBeNull
    })

})