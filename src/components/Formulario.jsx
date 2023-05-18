import { useEffect, useState } from 'react'
import React from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../datos/monedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border:none;
    width:100%;
    padding:10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size:20px;
    border-radius: 10px;
    transition: background-color .3s ease;
    margin-top:30px;

    &:hover{
        background-color:#7A7DFE;
        cursor:pointer;
    }
`

const Formulario = () => {
    const [criptos, setCriptos] = useState([])

    const [ state, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( crypto => {

                const objeto = {
                    id: crypto.CoinInfo.Name,
                    nombre: crypto.CoinInfo.FullName
                }
                return objeto
            })

            setCriptos(arrayCriptos)
        }
        consultarAPI();
    }, [])

  return (
    <form>

        <SelectMonedas />

        <InputSubmit 
        type="submit" 
        value="Cotizar" 
        />

    </form>
  )
}

export default Formulario
