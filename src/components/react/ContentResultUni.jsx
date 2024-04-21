import CardUniversidades from "../CardUniversidades.astro";
// import { compararArea } from '../../logic/comparacion'
import { preguntas, respuestas } from "../../consts/prueba";
import { areas } from "../../consts/areas";
import { universidadesGuerrero } from "../../consts/unis";
import { useState, useEffect } from "preact/hooks";
import CardUni from "./CardUni";

export default function ContentResultUni() {
  const [respuestasS, setRespuestas] = useState([]);

  function compararArea(area, respuestas, preguntas) {
    const areaPreguntas = Object.values(preguntas).filter(
      (pregunta) => pregunta.area === area
    );

    const resultados = areaPreguntas.map((pregunta) => {
      const indexPregunta = Object.keys(preguntas).find(
        (key) => preguntas[key] === pregunta
      );
      const respuestaUsuario = respuestas[indexPregunta - 1];

      return respuestaUsuario === pregunta.respuestaCorrecta ? 1 : 0;
    });

    return resultados;
  }

  useEffect(() => {
    const respuetasFromStorage = window.localStorage.getItem("repuestasUser");
    setRespuestas(JSON.parse(respuetasFromStorage));
  }, []);

  const objrespuestasCorrectas = {};
  areas.forEach((area) => {
    const resultadoArea = compararArea(area, respuestasS, preguntas);
    objrespuestasCorrectas[area] = { respuestasCorrectas: resultadoArea };
  });
  console.log("objeto con respuestas", objrespuestasCorrectas);

  function eliminarCeros(obj) {
    for (const area in obj) {
      obj[area].respuestasCorrectas = obj[area].respuestasCorrectas.filter(
        (respuesta) => respuesta === 1
      );
    }
  }
  eliminarCeros(objrespuestasCorrectas);
  console.log("respuestas correctas", objrespuestasCorrectas);

  function encontrarCategoriaConMasRespuestasCorrectas(obj) {
    let mayorCantidadRespuestas = 0;
    let categoriaConMasRespuestas;

    for (const area in obj) {
      const cantidadRespuestasCorrectas = obj[area].respuestasCorrectas.length;
      if (cantidadRespuestasCorrectas > mayorCantidadRespuestas) {
        mayorCantidadRespuestas = cantidadRespuestasCorrectas;
        categoriaConMasRespuestas = area;
      }
    }

    return categoriaConMasRespuestas;
  }

  const categoriaConMasRespuestas = encontrarCategoriaConMasRespuestasCorrectas(
    objrespuestasCorrectas
  );
  console.log("area con mas correctas", categoriaConMasRespuestas);

  const universidadesAreaMaxRespuestas = universidadesGuerrero.filter(
    (universidad) => universidad.area === categoriaConMasRespuestas
  );
  console.log(universidadesAreaMaxRespuestas);

  return (
    <>
      <h1 class="titulo-result">
        <span class="cuadro">Resultado</span> de la Prueba.
      </h1>
      <p class="texto-result">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi id
        aliquid vitae labore eos obcaecati ducimus minima quo quis commodi, nam
        dolore sequi fugiat laboriosam excepturi repellat consequatur
        exercitationem. Voluptatibus. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Provident delectus corrupti, mollitia quia quae
        expedita veritatis, optio voluptate tempore fuga totam assumenda nam
        dolor molestias neque deserunt nesciunt esse iure.
      </p>
      <div class="contenido-unis">
        <h2>Area asignada</h2>
        <p class="texto-result">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
          expedita quis quae. Pariatur unde temporibus hic consequatur, magnam
          illo, maiores quas nobis aspernatur sit maxime, iusto fuga vitae
          tempora accusantium.
        </p>
      </div>
      <section class="contenedor-universidades">
        {universidadesAreaMaxRespuestas.map((universidad, index) => (
          <CardUni
            nombre={universidad.nombre}
            tipo={universidad.tipoCarrera}
            region={universidad.region}
            direccion={universidad.direccion}
            link={universidad.enlace}
          />
        ))}
      </section>
    </>

    // <>
    //     {
    //         universidadesAreaMaxRespuestas.map((universidad, index) => (
    //             <CardUni
    //                 nombre={universidad.nombre}
    //                 tipo={universidad.tipoCarrera}
    //                 region={universidad.region}
    //                 direccion={universidad.direccion}
    //                 link={universidad.enlace}
    //             />
    //         ))
    //     }
    // </>
  );
}
