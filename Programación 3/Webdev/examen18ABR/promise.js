    class Vehiculos {
        constructor() { 
        this.arrayVehiculos = [];
    }

    guardarVehiculo(placa, modelo, marca, color) {
        return new Promise((resolve, reject) => {
            if (!placa || this.arrayVehiculos.some(vehiculo => vehiculo.placa === placa)) {
                reject('La placa no puede estar vacía o duplicada');
            } else {
                const vehiculo = { placa, modelo, marca, color };
                this.arrayVehiculos.push(vehiculo);
                resolve('Vehículo guardado correctamente');
            }
        });
    }
}

// Uso de la promesa
const vehiculos = new Vehiculos();

// Ejemplo 1: Guardar un vehículo válido
vehiculos.guardarVehiculo('ABC123', 'Sedán', 'Toyota', 'Azul')
    .then((mensaje) => {
        console.log(mensaje);
    })
    .catch((error) => {
        console.log(error);
    });

// Ejemplo 2: Intentar guardar un vehículo con placa duplicada
vehiculos.guardarVehiculo('ABC123', 'Sedán', 'Toyota', 'Rojo')
    .then((mensaje) => {
        console.log(mensaje);
    })
    .catch((error) => {
        console.log(error);
    });

// Ejemplo 3: Intentar guardar un vehículo con placa vacía
vehiculos.guardarVehiculo('', 'Hatchback', 'Honda', 'Verde')
    .then((mensaje) => {
        console.log(mensaje);
    })
    .catch((error) => {
        console.log(error);
    });
