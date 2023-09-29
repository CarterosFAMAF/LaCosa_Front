import './Carta.css'

function Carta({id, imagen, brillo, setSeleccion}) {
  const brillo_style = (brillo === 1)? { border: `6px solid rgba(0, 60, 0, 0.6)`} : {} 
  return (
    <img className='carta' style={brillo_style} src={imagen} onClick={() => setSeleccion(id)}/>
  )
}

export default Carta