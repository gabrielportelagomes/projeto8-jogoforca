import styled from "styled-components"

export default function Chute(props) {
    return (
        <Palpite estado={props.enviaDesabilitado}>
            <p>Já sei a palavra!</p>
            <input disabled={props.enviaDesabilitado} value={props.enviaChute} onChange={e => props.enviaSetChute(e.target.value)} data-identifier="type-guess"></input>
            <button disabled={props.enviaDesabilitado} onClick={() => props.enviaChutarPalavra()} data-identifier="guess-button">Chutar</button>
        </Palpite>
    )
}

const Palpite = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        font-size: 20px;
        font-weight: 400;
        margin-right: 20px;
    }
    input {
        width: 300px;
        height: 40px;
        margin-right: 20px;
        border: 3px solid black;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 400;
    }
    button {
        width: 80px;
        height: 40px;
        font-size: 18px;
        font-weight: 700;
        color: #417bad;
        background-color: #e1ecf4;
        border: 2px solid #8Bb3cf;
        border-radius: 5px;
        cursor: ${(props) => props.estado === true ? "initial" : "pointer"};
    }
`