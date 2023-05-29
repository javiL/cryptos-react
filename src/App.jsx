import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCryptoAlt from './img/img-cryptos.webp'
import Formulario from './components/Formulario'
import Spinner from './components/Spinner'
import Resultado from './components/Resultado'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 990px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width:400px;
  width: 80%;
  margin: 200px auto 0 auto;
  display: block;
  @media (max-width: 768px) {
  display: none;
}
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight:700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultadoAPI, setResultadoAPI] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0){

      const cotizarCripto = async () => {
        setCargando(true)
        setResultadoAPI({})
        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        
        setResultadoAPI(resultado.DISPLAY[criptomoneda][moneda])
        
        setCargando(false)
      }

      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>

      <Imagen 
        src={ImagenCryptoAlt}
        alt="ver "
      />

      <div>
        <Heading>Cotización en tiempo real de criptomonedas</Heading>

        <Formulario 
          setMonedas={setMonedas}
        />

        {cargando && <Spinner />}

        {resultadoAPI.PRICE && <Resultado resultadoAPI={resultadoAPI}/> }
      </div>

    </Contenedor>
  )
}

export default App