import { useState, useEffect } from 'preact/hooks';
import { preguntas } from '../../consts/prueba';
import CardPregun from './CardPregun';
import ContentResultUni from './ContentResultUni';

export default function ContentPregun(props) {
    const [preguntaActual, setPreguntaActual] = useState(0)
    useEffect(() => {
        const preguntaFromStorage = window.localStorage.getItem('preguntaActual')
        setPreguntaActual(preguntaFromStorage ? parseInt(preguntaFromStorage) + 1 : 0)
        console.log(preguntaFromStorage)
    }, [])

    const [textoBoton, setTextoBoton] = useState('Siguiente');

    const totalPregun = Object.keys(preguntas).length;

    function guardarRespuestas() {
        const result = [];
        const formulario = document.getElementById("formulario")
        if (formulario) {
            formulario.addEventListener("submit", (e) => {
            e.preventDefault();
            const valorSeleccionado = document.querySelector('input[name="value-radio"]:checked')
            if (valorSeleccionado !== null) {
                result.push(parseInt(valorSeleccionado.value));
                window.localStorage.setItem("repuestasUser", JSON.stringify(result));
                // console.log(valorSeleccionado);
                console.log(window.localStorage.getItem("repuestasUser"));
                if (valorSeleccionado.checked === true)
                valorSeleccionado.checked = false;
            }
            // alert(valorSeleccionado.value);
            });
        }
    }

    function siguientePregunta() {
        const valorSeleccionado = document.querySelector('input[name="value-radio"]:checked')
        const error = document.querySelector('.error')
        if(valorSeleccionado === null) error.classList.remove('invisible')
        else if(valorSeleccionado !== null) {
            if(error.className.includes('invisible')) {
                if (preguntaActual < totalPregun - 1) {
                    setPreguntaActual(preguntaActual + 1)
                    guardarRespuestas()
                    if (preguntaActual === totalPregun - 2) {
                        setTextoBoton('Terminar');
                        const direcc = document.getElementById('termina')
                        // direcc.href = '/prueba/resultados'
                    } else {
                        setTextoBoton('Siguiente');
                        // console.log(`pregunta actual:${preguntaActual}, totalpre${totalPregun - 2}`)
                    }
                }
            }
            else {
                if (preguntaActual < totalPregun - 1) {
                    setPreguntaActual(preguntaActual + 1)
                    guardarRespuestas()
                    props.onEstadoCambiado(preguntaActual)
                    error.classList.add('invisible')
                    if (preguntaActual === totalPregun - 2) {
                        setTextoBoton('Terminar');
                        const direcc = document.getElementById('termina')
                        // direcc.href = '/prueba/resultados'
                    } else {
                        setTextoBoton('Siguiente');
                        // console.log(`pregunta actual:${preguntaActual}, totalpre${totalPregun - 2}`)
                    }
                }
            }

            console.log(preguntaActual)
            props.onEstadoCambiado(preguntaActual)
            window.localStorage.setItem('preguntaActual', preguntaActual)
        }
    }
    function remo() {
        window.localStorage.removeItem('preguntaActual')
        console.log(preguntaActual)
    }

    return (
        <>
            <div id="content-titulo-pregunta">
                <h1 id="titulo-pregunta">Prueba de <span class="cuadro">Orientación</span></h1>
                <p>
                Este test se adapta a sus necesidades, es gratuito y le llevará menos
                de 15 minutos.
                </p>
            </div>
            <section id="preguntas">
                <form id="formulario">
                {
                    Object.values(preguntas)[preguntaActual] && (
                        <CardPregun
                            pregunta={Object.values(preguntas)[preguntaActual].pregunta}
                            numPregunta={preguntaActual + 1}
                            totalPregutas={totalPregun}
                            respuestas={Object.values(preguntas)[preguntaActual].respuestas}
                        />
                    )
                }
                    <div id="cont-boton">
                        <p className="error invisible">Debes seleccionar una respuesta antes de continuar.</p>
                        <button 
                            id="sumit" 
                            class='boton-sig' 
                            onClick={siguientePregunta} 
                            type="submit"
                        >
                            <a id="termina" target="_blank">{textoBoton}</a>
                        </button>
                        <button onClick={remo}>remove</button>
                    </div>
                </form>
            </section>
            <span id="text-preguntas">
                Utilizamos tus respuestas para orientarte a encontrar una Vocación.
            </span>
        </>


        // <form id="formulario">
        //     {
        //         Object.values(preguntas)[preguntaActual] && (
        //             <CardPregun
        //                 pregunta={Object.values(preguntas)[preguntaActual].pregunta}
        //                 numPregunta={preguntaActual + 1}
        //                 totalPregutas={totalPregun}
        //                 respuestas={Object.values(preguntas)[preguntaActual].respuestas}
        //             />
        //         )
        //     }
        //     <div id="cont-boton">
        //         <p className="error invisible">Debes seleccionar una respuesta antes de continuar.</p>
        //         <button 
        //             id="sumit" 
        //             class='boton-sig' 
        //             onClick={siguientePregunta} 
        //             type="submit"
        //         >
        //             <a id="termina" target="_blank">{textoBoton}</a>
        //         </button>
        //         <button onClick={remo}>remove</button>
        //     </div>
        // </form>
    );
}