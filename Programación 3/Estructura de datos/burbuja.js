// Función para generar un número aleatorio entre min y max, inclusive
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para crear un vector de tamaño n con números aleatorios entre 1 y 30
function crearVector(n) {
  const vector = [];
  for (let i = 0; i < n; i++) {
    vector.push(getRandomInt(1, 30));
  }
  return vector;
}

// Función de ordenamiento de burbuja
function ordenamientoBurbuja(vector) {
  const n = vector.length;
  let comparaciones = 0;
  let intercambios = 0;
  let swapped;
  
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      comparaciones++;
      if (vector[i] > vector[i + 1]) {
        // Intercambiar elementos si están en el orden incorrecto
        const temp = vector[i];
        vector[i] = vector[i + 1];
        vector[i + 1] = temp;
        swapped = true;
        intercambios++;
      }
    }
  } while (swapped);
  
  console.log(`Número de comparaciones realizadas: ${comparaciones}`);
  console.log(`Número de intercambios realizados: ${intercambios}`);
  
  return vector;
}

// Crear un vector de 15 elementos con números aleatorios
const vector = crearVector(15);

// Mostrar el vector desordenado
console.log("Vector desordenado:", vector);

// Ordenar el vector utilizando el método de burbuja
const vectorOrdenado = ordenamientoBurbuja(vector.slice());

// Mostrar el vector ordenado
console.log("Vector ordenado:", vectorOrdenado);
