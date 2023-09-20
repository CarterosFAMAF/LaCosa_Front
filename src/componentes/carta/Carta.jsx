import './Carta.css'

function Carta({imagen}) {

  return (
    <img className='carta' src={imagen}/>
  )
}

export default Carta