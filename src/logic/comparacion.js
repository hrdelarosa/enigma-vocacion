export function compararArea(area, respuestas, preguntas) {
  const areaPreguntas = Object.values(preguntas).filter(pregunta => pregunta.area === area);
  
  const resultados = areaPreguntas.map(pregunta => {
      const indexPregunta = Object.keys(preguntas).find(key => preguntas[key] === pregunta);
      const respuestaUsuario = respuestas[indexPregunta - 1];
  
      return respuestaUsuario === pregunta.respuestaCorrecta ? 1 : 0;
  });
  
  return resultados;
}