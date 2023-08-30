//Sarmiento Guizar Angel Eduardo | GitHub:AsGuizar | 3I
//----------------------------------------------------------------
// Función para calcular el avance de la tortuga
function tortoiseMove() {
    const randomNumber = Math.random();

    if (randomNumber < 0.45) {
        return 3; // Paso rápido
    } else if (randomNumber < 0.7) {
        return -6; // Resbalón
    } else {
        return 1; // Paso lento
    }
}

// Función para calcular el avance de la liebre
function hareMove() {
    const randomNumber = Math.random();

    if (randomNumber < 0.2) {
        return 0; // Dormir
    } else if (randomNumber < 0.4) {
        return 9; // Salto grande
    } else if (randomNumber < 0.5) {
        return -12; // Resbalón grande
    } else if (randomNumber < 0.85) {
        return 1; // Salto pequeño
    } else {
        return -2; // Resbalón pequeño
    }
}

// Inicialización de posiciones
let tortoisePosition = 0;
let harePosition = 0;

// Simulación de la carrera
for (let step = 1; step <= 100; step++) {
    tortoisePosition += tortoiseMove();
    harePosition += hareMove();

    // Asegurarse de que las posiciones no sean negativas
    tortoisePosition = Math.max(tortoisePosition, 0);
    harePosition = Math.max(harePosition, 0);

    // Mostrar las posiciones de la tortuga y la liebre
    console.log(`Paso ${step}: Tortuga: ${tortoisePosition} - Liebre: ${harePosition}`);

    // Verificar si hay un ganador
    if (tortoisePosition >= 100 || harePosition >= 100) {
        break;
    }
}

// Determinar el resultado final
if (tortoisePosition > harePosition) {
    console.log("¡La tortuga ganó!");
} else if (harePosition > tortoisePosition) {
    console.log("¡La liebre ganó!");
} else {
    console.log("¡Empate!");
}
