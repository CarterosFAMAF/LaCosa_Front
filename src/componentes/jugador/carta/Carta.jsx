import './Carta.css'

function Carta({select_card_method, imagen, id, brillo}) {
  const brillo_style = (brillo === 1)? { border: `6px solid rgba(0, 60, 0, 0.6)`} : {} 

  return (
    <img style={brillo_style} className='carta' src={imagen} onClick={() => select_card_method(id)}/>
  )
}

export default Carta