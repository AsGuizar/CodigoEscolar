function calcularTiempoTrabajado(horaEntrada, minutoEntrada, segundoEntrada, horaSalida, minutoSalida, segundoSalida) {
    // Convertir todo a segundos
    let entradaSegundos = horaEntrada * 3600 + minutoEntrada * 60 + segundoEntrada;
    let salidaSegundos = horaSalida * 3600 + minutoSalida * 60 + segundoSalida;

    // Calcular la diferencia
    let trabajadoSegundos = salidaSegundos - entradaSegundos;

    // Convertir los segundos trabajados a horas, minutos y segundos
    let horasTrabajadas = Math.floor(trabajadoSegundos / 3600);
    trabajadoSegundos %= 3600;
    let minutosTrabajados = Math.floor(trabajadoSegundos / 60);
    let segundosTrabajados = trabajadoSegundos % 60;

    return {
        horas: horasTrabajadas,
        minutos: minutosTrabajados,
        segundos: segundosTrabajados
    };
}

// Ejemplo de uso
let tiempoTrabajado = calcularTiempoTrabajado(8, 30, 0, 17, 45, 30);
console.log(`Horas trabajadas: ${tiempoTrabajado.horas}, Minutos trabajados: ${tiempoTrabajado.minutos}, Segundos trabajados: ${tiempoTrabajado.segundos}`);
