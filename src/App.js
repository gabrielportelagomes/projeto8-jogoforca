import { useState } from "react"
import GlobalStyle from "./GlobalStyle"
import styled from "styled-components"
import forca0 from "./assets/img/forca0.png"
import forca1 from "./assets/img/forca1.png"
import forca2 from "./assets/img/forca2.png"
import forca3 from "./assets/img/forca3.png"
import forca4 from "./assets/img/forca4.png"
import forca5 from "./assets/img/forca5.png"
import forca6 from "./assets/img/forca6.png"
import palavras from "./palavras"

function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [letrasSelecionadas, setLetrasSelecionadas] = useState([])
    const [arrayPalavra, setArrayPalavra] = useState([])
    const [errosImagem, setErrosImagem] = useState(forca0)
    const [erros, setErros] = useState(0)
    const [acertos, setAcertos] = useState(0)
    const [palavraSorteada, setPalavraSorteada] = useState("")
    const [arrayPalavraSorteada, setArrayPalavraSorteada] = useState([])
    const [desabilitado, setDesabilitado] = useState(true)
    const [iniciado, setIniciado] = useState(false)
    const [palavraCompara, setPalavraCompara] = useState([])
    const [chute, setChute] = useState("")
    const [corDaPalavra, setCorDaPalavra] = useState("#000000")

    function selecionarLetra(letra) {
        const novaLetrasSelecionadas = [...letrasSelecionadas, letra]
        setLetrasSelecionadas(novaLetrasSelecionadas)
        const novoArrayOculto = arrayPalavra
        if (palavraCompara.includes(letra)) {
            let indexPalavra = palavraCompara.indexOf(letra)
            let quantidadeAcertos = 0
            while (indexPalavra !== -1) {
                novoArrayOculto[indexPalavra] = arrayPalavraSorteada[indexPalavra]
                indexPalavra = palavraCompara.indexOf(letra, indexPalavra + 1)
                quantidadeAcertos++
            }
            quantidadeAcertos = acertos + quantidadeAcertos
            setAcertos(quantidadeAcertos)
            setArrayPalavra(novoArrayOculto)
            if (quantidadeAcertos === palavraCompara.length) {
                setDesabilitado(true)
                setLetrasSelecionadas(alfabeto)
                setCorDaPalavra("#228b22")
            }
        } else {
            const quantidadeErros = erros + 1
            setErros(quantidadeErros)
            if (quantidadeErros === 0) {
                setErrosImagem(forca0)
            } else if (quantidadeErros === 1) {
                setErrosImagem(forca1)
            } else if (quantidadeErros === 2) {
                setErrosImagem(forca2)
            } else if (quantidadeErros === 3) {
                setErrosImagem(forca3)
            } else if (quantidadeErros === 4) {
                setErrosImagem(forca4)
            } else if (quantidadeErros === 5) {
                setErrosImagem(forca5)
            } else if (quantidadeErros === 6) {
                setErrosImagem(forca6)
                setDesabilitado(true)
                setLetrasSelecionadas(alfabeto)
                setArrayPalavra(palavraSorteada)
                setCorDaPalavra("#ff0000")
            }
        }
    }

    function sortearPalavra() {
        reset()
        const novaPalavra = palavras.sort(indicator)[0]
        setPalavraSorteada(novaPalavra)
        const arrayPalavraCompara = novaPalavra.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split('')
        setPalavraCompara(arrayPalavraCompara)
        const arrayNovaPalavra = novaPalavra.split('')
        setArrayPalavraSorteada(arrayNovaPalavra)
        const palavraoculta = arrayPalavraCompara.map(l => " _")
        setArrayPalavra(palavraoculta)
        setDesabilitado(false)
        setIniciado(true)
    }

    console.log(arrayPalavraSorteada)

    function reset() {
        setErros(0)
        setAcertos(0)
        setLetrasSelecionadas([])
        setArrayPalavra([])
        setCorDaPalavra("#000000")
        setErrosImagem(forca0)
        setChute("")
    }

    function indicator() {
        return Math.random() - 0.5;
    }

    function chutarPalavra() {
        setDesabilitado(true)
        setLetrasSelecionadas(alfabeto)
        if (chute === palavraSorteada) {
            setArrayPalavra(palavraSorteada)
            setCorDaPalavra("#228b22")
        } else {
            setErros(6)
            setErrosImagem(forca6)
            setArrayPalavra(palavraSorteada)
            setCorDaPalavra("#ff0000")
        }
    }

    return (
        <Conteudo>
            <GlobalStyle />
            <Topo>
                <Forca>
                    <img src={errosImagem} alt="imagem que mostra o estado do jogo" data-identifier="game-image" />
                </Forca>
                <Direita>
                    <Sortear>
                        <button onClick={sortearPalavra} data-identifier="choose-word">Escolher Palavra</button>
                    </Sortear>
                    <Palavra corPalavra={corDaPalavra} data-identifier="word">{arrayPalavra}</Palavra>
                </Direita>
            </Topo>
            <Letras>
                {alfabeto.map((a, index) => <Letra incluido={letrasSelecionadas.includes(a)} estado={iniciado} disabled={!iniciado ? desabilitado : letrasSelecionadas.includes(a) ? true : false} onClick={() => selecionarLetra(a)} key={index} data-identifier="letter">{a.toUpperCase()}</Letra>)}
            </Letras>
            <Palpite estado={desabilitado}>
                <p>Já sei a palavra!</p>
                <input disabled={desabilitado} value={chute} onChange={e => setChute(e.target.value)} data-identifier="type-guess"></input>
                <button disabled={desabilitado} onClick={chutarPalavra} data-identifier="guess-button">Chutar</button>
            </Palpite>
        </Conteudo>
    );
}

export default App

const Conteudo = styled.div`
    width: 800px;
    height: 100%;
    margin: 70px auto 0 auto;
    display: flex;
    flex-direction: column;
`

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

const Letras = styled.div`
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