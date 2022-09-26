import styled from "styled-components"

export default function Jogo(props) {
    return (
        <Topo>
    <Forca>
        <img src={props.enviaErrosImagem} alt="imagem que mostra o estado do jogo" data-identifier="game-image" />
    </Forca>
    <Direita>
        <Sortear>
            <button onClick={() => props.enviaSortearPalavra()} data-identifier="choose-word">Escolher Palavra</button>
        </Sortear>
        <Palavra corPalavra={props.enviaCorDaPalavra} data-identifier="word">{props.enviaArrayPalavra}</Palavra>
    </Direita>
</Topo>
    )
}

const Topo = styled.div`
    display: flex;
`

const Forca = styled.div`
    width: 60%;
    margin-bottom: 40px;
    img {
        width: 90%;
        margin-left: 10px;
    }
`

const Direita = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    position: relative;
`

const Sortear = styled.div`
    position: absolute;
    top: 40px;
    right: 60px;
    button {
        width: 150px;
        height: 40px;
        font-size: 16px;
        font-weight: 700;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        background-color: #27ae60;
        cursor: pointer;
    }
`

const Palavra = styled.div`
    position: absolute;
    bottom: 40px;
    right: 60px;
    font-size: 35px;
    font-weight: 700;
    color: ${(props) => props.corPalavra};
`
