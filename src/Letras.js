import styled from "styled-components"

export default function Letras(props) {
    return (
        <Alfabeto>
            {props.enviaAlfabeto.map((a, index) => <Letra incluido={props.enviaLetrasSelecionadas.includes(a)} estado={props.enviaIniciado} disabled={!props.enviaIniciado ? props.enviaDesabilitado : props.enviaLetrasSelecionadas.includes(a) ? true : false} onClick={() => props.enviaSelecionarLetra(a)} key={index} data-identifier="letter">{a.toUpperCase()}</Letra>)}
        </Alfabeto>
    )
}

const Alfabeto = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin-bottom: 40px;
`
const Letra = styled.button`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => {
        if (props.estado === true) {
            if (props.incluido === true) {
                return "#79818A"
            } else {
                return "#39739D"
            }
        } else {
            return "#79818A"
        }
    }};
    background-color: ${(props) => {
        if (props.estado === true) {
            if (props.incluido === true) {
                return "#9FAAB5"
            } else {
                return "#E1ECF4"
            }
        } else {
            return "#9FAAB5"
        }
    }};
    border: ${(props) => {
        if (props.estado === true) {
            if (props.incluido === true) {
                return "none"
            } else {
                return "2px solid #8BB3CF"
            }
        } else {
            return "none"
        }
    }};
    cursor: ${(props) => {
        if (props.estado === true) {
            if (props.incluido === true) {
                return "inicial"
            } else {
                return "pointer"
            }
        } else {
            return "initial"
        }
    }};
`