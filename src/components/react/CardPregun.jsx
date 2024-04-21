import Respuesta from "./Respuesta"

export default function CardPregun({ pregunta, numPregunta, totalPregutas, respuestas }) {
    
    return (
        <section className='content-pregun'>
            <h3 className='numPregunta'>{`Pregunta ${numPregunta} de ${totalPregutas}`}</h3>
            <div id="content-pregunta">
                <h1 className='pregunta'>{pregunta}</h1>
                <div id="respuestas">
                    <ol className='list-pregun'>
                        {respuestas.map((res, index) => (
                            <Respuesta respuesta={res} value={index} /> 
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}