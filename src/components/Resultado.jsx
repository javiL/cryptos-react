import styled from "@emotion/styled"

const ResultadoFormat = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display:flex;
    align-items: center;
    gap: 1rem;
    margin-top:30px;
`

const TextoResult = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const ImagenCrypto = styled.img`
    display:block;
    width:125px;
`

const PrecioResult = styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`



const Resultado = ({resultadoAPI}) => {
    
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultadoAPI
    
    const traducir = (strTraducir,strTraducido) => {
        const cadenaTraducida = strTraducir.replace(strTraducir,strTraducido)
        
        return cadenaTraducida
    }
    
  return (
    <ResultadoFormat>
        <ImagenCrypto 
        src={`https://cryptocompare.com/${IMAGEURL}`} 
        alt="imagen cripto">

        </ImagenCrypto>
        <div>
            <PrecioResult>El precio es de: <span>{PRICE}</span></PrecioResult>
            <TextoResult>El precio más alto de hoy es: <span>{HIGHDAY}</span></TextoResult>
            <TextoResult>El precio más bajo de hoy es: <span>{LOWDAY}</span></TextoResult>
            <TextoResult>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></TextoResult>
            <TextoResult>Última actualización: <span>{traducir(LASTUPDATE,'Ahora mismo')}</span></TextoResult>
        </div>
    </ResultadoFormat>
  )
}

export default Resultado
