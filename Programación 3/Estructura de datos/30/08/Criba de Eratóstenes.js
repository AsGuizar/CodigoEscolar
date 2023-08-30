function encontrarPrimosHasta(n) {
    const esPrimo = new Array(n).fill(true);
    esPrimo[0] = false;
    esPrimo[1] = false;
    
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (esPrimo[i]) {
            for (let j = i * i; j < n; j += i) {
                esPrimo[j] = false;
            }
        }
    }
    
    const primos = [];
    for (let i = 2; i < n; i++) {
        if (esPrimo[i]) {
            primos.push(i);
        }
    }
    
    return primos;
}

const numerosPrimos = encontrarPrimosHasta(1000);
console.log("Números primos menores a 1000:", numerosPrimos);