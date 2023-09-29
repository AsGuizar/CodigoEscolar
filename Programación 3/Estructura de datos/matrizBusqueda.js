let matriz = [
    ['a', 'b', 'c', 'd', 'e'],
    ['f', 'g', 'h', 'i', 'j'],
    ['k', 'l', 'm', 'n', 'o'],
    ['p', 'q', 'r', 's', 't'],
    ['u', 'v', 'w', 'x', 'y']
];

// Guardar los elementos (j, n, o, t) en una variable temporal y reemplazarlos con (y, v, w, x)
for(let i = 0; i < 4; i++) {
    let temp = matriz[i+1][4-i];
    matriz[i+1][4-i] = matriz[4][i];
    matriz[4][i] = temp;
}

// Imprimir la matriz
for(let i = 0; i < matriz.length; i++) {
    console.log(matriz[i]);
}


