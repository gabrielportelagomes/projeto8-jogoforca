import { useState } from "react"
import GlobalStyle from "./GlobalStyle"
import styled from "styled-components"
import Jogo from "./Jogo"
import Letras from "./Letras"
import Chute from "./Chute"
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
    const [palavraSimples, setPalavraSimples] = useState("")
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
        const palavraSemEspeciais = novaPalavra.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        setPalavraSimples(palavraSemEspeciais)
        const arrayPalavraCompara = palavraSemEspeciais.split('')
        setPalavraCompara(arrayPalavraCompara)
        const arrayNovaPalavra = novaPalavra.split('')
        setArrayPalavraSorteada(arrayNovaPalavra)
        const palavraoculta = arrayPalavraCompara.map(l => " _")
        setArrayPalavra(palavraoculta)
        setDesabilitado(false)
        setIniciado(true)
    }

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
        if (chute === palavraSorteada || chute === palavraSimples) {
            setDesabilitado(true)
            setLetrasSelecionadas(alfabeto)
            setArrayPalavra(palavraSorteada)
            setCorDaPalavra("#228b22")
        } else if (chute === "") {
            return
        } else {
            setDesabilitado(true)
            setLetrasSelecionadas(alfabeto)
            setErros(6)
            setErrosImagem(forca6)
            setArrayPalavra(palavraSorteada)
            setCorDaPalavra("#ff0000")
        }
    }

    return (
        <Conteudo>
            <GlobalStyle />
            <Jogo enviaErrosImagem={errosImagem} enviaSortearPalavra={sortearPalavra} enviaCorDaPalavra={corDaPalavra} enviaArrayPalavra={arrayPalavra} />
            <Letras enviaAlfabeto={alfabeto} enviaLetrasSelecionadas={letrasSelecionadas} enviaIniciado={iniciado} enviaDesabilitado={desabilitado} enviaSelecionarLetra={selecionarLetra} />
            <Chute enviaDesabilitado={desabilitado} enviaChute={chute} enviaSetChute={setChute} enviaChutarPalavra={chutarPalavra} />
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