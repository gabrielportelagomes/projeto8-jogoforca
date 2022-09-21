import palavras from "./palavras"
import "./css/reset.css"
import "./css/style.css"
import forca0 from "./assets/img/forca0.png"
import forca1 from "./assets/img/forca1.png"
import forca2 from "./assets/img/forca2.png"
import forca3 from "./assets/img/forca3.png"
import forca4 from "./assets/img/forca4.png"
import forca5 from "./assets/img/forca5.png"
import forca6 from "./assets/img/forca6.png"

function Letra(props) {
    return (
        <div className="letra">{props.letra.toUpperCase()}</div>
    )
}

export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    return (
        <div className="app">
            <div className="topo">
                <div className="forca">
                    <img src={forca0} />
                </div>
                <div className="direita">
                    <div className="sortear">
                        <button>Escolher Palavra</button>
                    </div>
                    <div className="palavra"></div>
                </div>
            </div>
            <div className="alfabeto">
                {alfabeto.map((a, index) => <Letra key={index} letra={a}/>)}
            </div>
            <div className="palpite">
                <p>Já sei a palavra!</p>
                <input></input>
                <button>Chutar</button>
            </div>
        </div>
    );
}