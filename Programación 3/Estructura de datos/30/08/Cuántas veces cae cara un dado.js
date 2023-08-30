// Crear un objeto para almacenar el conteo de caras del dado
const conteoCaras = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  };
  
  // Función para simular el lanzamiento de un dado
  function lanzarDado() {
    return Math.floor(Math.random() * 6) + 1; // Genera un número aleatorio entre 1 y 6
  }
  
  // Lanzar el dado 100 veces
  for (let i = 0; i < 100; i++) {
    const resultadoLanzamiento = lanzarDado();
    conteoCaras[resultadoLanzamiento]++; // Incrementar el conteo de la cara correspondiente
  }
  
  // Imprimir los resultados
  for (const cara in conteoCaras) {
    console.log(`Cara ${cara} salió ${conteoCaras[cara]} veces`);
  }