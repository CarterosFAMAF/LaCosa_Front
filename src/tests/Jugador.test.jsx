import { render } from '@testing-library/react'
import { describe, test } from 'vitest'
import Jugador from '../componentes/jugador/Jugador'

describe("Jugador Test", () => {

    test("Renderiza Jugador", () => {
        render(<Jugador id="Jugador"/>)
        document.getElementById("Jugador")
    })

})
