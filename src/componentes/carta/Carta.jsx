import './Carta.css'

function Carta({select_card_method, imagen, id, brillo}) {
  const brillo_style = (brillo === 1)? { border: `6px solid rgba(0, 60, 0, 0.6)`} : {} 

  const popup_fun = () => {
    select_card_method(id)
  }

  return (
    <img style={brillo_style} className='carta' src={imagen} onClick={() => popup_fun()}/>
  )
}

export default Carta