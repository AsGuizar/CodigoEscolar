// Vector original
let vector = [1, 3, 5, 9, 7, 8, 6, 15, 22];

// Obtener la longitud del vector
let longitud = vector.length;

// Recorrer la mitad del vector
for (let i = 0; i < Math.floor(longitud / 2); i++) {
  // Intercambiar elementos en las posiciones i y longitud - 1 - i
  let temp = vector[i];                                 // Guardar temporalmente el valor en la posición i
  vector[i] = vector[longitud - 1 - i];                 // Colocar el valor de la posición opuesta en la posición i
  vector[longitud - 1 - i] = temp;                      // Colocar el valor guardado en temp en la posición opuesta
}

// Mostrar el vector invertido
console.log("Vector invertido:", vector);