import { useState } from "react"
import "./css/reset.css"
import "./css/style.css"
import forca0 from "./assets/img/forca0.png"
import forca1 from "./assets/img/forca1.png"
import forca2 from "./assets/img/forca2.png"
import forca3 from "./assets/img/forca3.png"
import forca4 from "./assets/img/forca4.png"
import forca5 from "./assets/img/forca5.png"
import forca6 from "./assets/img/forca6.png"
import palavras from "./palavras"

export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [letrasSelecionadas, setLetrasSelecionadas] = useState([])
    const [arrayPalavra, setArrayPalavra] = useState([])
    const [errosImagem, setErrosImagem] = useState(forca0)
    const [erros, setErros] = useState(0)
    const [acertos, setAcertos] = useState(0)
    const [palavraSorteada, setPalavraSorteada] = useState([])
    const [desabilitado, setDesabilitado] = useState(true)
    const [classeLetra, setClasseLetra] = useState("letra inicial")
    const [iniciado, setIniciado] = useState(false)

    function selecionarLetra(letra, index) {
        alert(letra)
        setIniciado(true)
        const novaLetrasSelecionadas = [...letrasSelecionadas, letra]
        setLetrasSelecionadas(novaLetrasSelecionadas)
        const novoArrayOculto = arrayPalavra
        if (palavraSorteada.includes(letra)) {
            alert("tem")
            let indexPalavra = palavraSorteada.indexOf(letra)
            let quantidadeAcertos = 0
            while (indexPalavra !== -1) {
                novoArrayOculto[indexPalavra]= letra
                indexPalavra = palavraSorteada.indexOf(letra, indexPalavra + 1)
                quantidadeAcertos = acertos + quantidadeAcertos + 1
                console.log("acertos: " + quantidadeAcertos)
            }
            setAcertos(quantidadeAcertos)
            setArrayPalavra(novoArrayOculto)
            if(quantidadeAcertos === palavraSorteada.length) {
                alert("você ganhou")
            }
        } else {
            const quantidadeErros = erros + 1
            console.log("erros: " + quantidadeErros)
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
                console.log("perdeu")
            }
        }
    }
    console.log(letrasSelecionadas)
    console.log(arrayPalavra)
    

    function sortearPalavra() {
        const novaPalavra = palavras.sort(indicator)[0].split('')
        setPalavraSorteada(novaPalavra)
        const palavraoculta = novaPalavra.map(l => " _")
        setArrayPalavra(palavraoculta)
        setDesabilitado(false)
        setClasseLetra("letra iniciado")
        setIniciado(true)
    }

    console.log(palavraSorteada)
    console.log(palavraSorteada.length)

    function indicator() {
        return Math.random() - 0.5;
    }

    function chutar() {
        alert("chute")
    }

    return (
        <div className="app">
            <div className="topo">
                <div className="forca">
                    <img src={errosImagem} />
                </div>
                <div className="direita">
                    <div className="sortear">
                        <button onClick={sortearPalavra}>Escolher Palavra</button>
                    </div>
                    <div className="palavra">{arrayPalavra}</div>
                </div>
            </div>
            <div className="letras">
                {alfabeto.map((a, index) => <button className={letrasSelecionadas.includes(a) ? "letra selecionado" : `${classeLetra}`} disabled={!iniciado ? desabilitado : letrasSelecionadas.includes(a) ? true : false} onClick={() => selecionarLetra(a, index)} key={index}>{a.toUpperCase()}</button>)}
            </div>
            <div className="palpite">
                <p>Já sei a palavra!</p>
                <input disabled={desabilitado}></input>
                <button disabled={desabilitado} onClick={chutar}>Chutar</button>
            </div>
        </div>
    );
}