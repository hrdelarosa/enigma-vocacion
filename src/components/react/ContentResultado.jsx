import { useEffect, useState } from "preact/hooks"
import ContentPregun from "./ContentPregun"
import ContentResultUni from "./ContentResultUni";
import { preguntas } from "../../consts/prueba";

export default function ContentResultado() {
    const [preguntaActual, setPreguntaActual] = useState('')
    const totalPregun = Object.keys(preguntas).length;
    console.log(totalPregun)

    const manejarPregunta = (estado) => {
        setPreguntaActual(estado);
        // console.log('estado del hijo', estado)
    };
    console.log(preguntaActual)
    return (
        <>
            {
                preguntaActual < 45 ? (
                    <ContentPregun onEstadoCambiado={manejarPregunta}></ContentPregun>
                ) : (
                    <ContentResultUni></ContentResultUni>
                )
            }
        </>
    )
}