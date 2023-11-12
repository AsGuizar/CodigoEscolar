class BaseNode {
  constructor(nombre, minutos) {
    this.nombre = nombre;
    this.minutos = minutos;
    this.siguiente = null;
  }
}

class RutaTransporte {
  constructor() {
    this.primero = null;
  }
   // Agregar una nueva base al final de la ruta
   agregarBase(base) {
    if (!this.primero) {
      this.primero = base;
      base.siguiente = base;
    } else {
      let actual = this.primero;
      while (actual.siguiente !== this.primero) {
        actual = actual.siguiente;
      }
      actual.siguiente = base;
      base.siguiente = this.primero;
    }
  }

  // Buscar una base en la ruta por su nombre
  buscarBase(nombre) {
    if (!this.primero) return null;
      let actual = this.primero;
    do {
      if (actual.nombre === nombre) {
        return actual;
      }
      actual = actual.siguiente;
    } while (actual !== this.primero);
    return null;
  }

  // Eliminar una base de la ruta por su nombre
  eliminarBase(nombre) {
    if (!this.primero) return;
    let actual = this.primero;
    let previo = null;
    do {
      if (actual.nombre === nombre) {
        if (actual === this.primero) {
          if (actual.siguiente === this.primero) {
            this.primero = null;
          } else {
            this.primero = actual.siguiente;
            previo = this.primero;
            while (previo.siguiente !== actual) {
              previo = previo.siguiente;
            }
            previo.siguiente = this.primero;
          }
        } else {
          previo.siguiente = actual.siguiente;
        }
        return;
      }
      previo = actual;
      actual = actual.siguiente;
    } while (actual !== this.primero);
  }

  // Listar todas las bases en la ruta
  listarBases() {
    if (!this.primero) return {};
      const bases = {};
      let actual = this.primero;
    do {
      bases[actual.nombre] = actual.minutos;
      actual = actual.siguiente;
    } while (actual !== this.primero);
    return bases;
  }
  
  // Listar todas las bases en orden inverso
  listarBasesEnOrdenInverso() {
    if (!this.primero) return "";

    let bases = "";
    let actual = this.primero;
    let previo;

    do {
        previo = actual;
        actual = actual.siguiente;
    } while (actual !== this.primero);

    do {
        bases += `Nombre: ${previo.nombre}, Minutos: ${previo.minutos}\n`;
        previo = previo.siguiente;
    } while (previo !== this.primero);

    return bases;
}

 // Agregar una base al inicio de la ruta 
 agregarBaseAlInicio(nombre, minutos) {
  const nuevaBase = new BaseNode(nombre, minutos);
  if (!this.primero) {
    this.primero = nuevaBase;
    nuevaBase.siguiente = nuevaBase;
  } else {
    let actual = this.primero;
    while (actual.siguiente !== this.primero) {
      actual = actual.siguiente;
    }
    actual.siguiente = nuevaBase; // El último nodo apunta a la nueva base
    nuevaBase.siguiente = this.primero; // La nueva base apunta a la antigua primera base
    this.primero = nuevaBase; // La nueva base se convierte en la primera base
  }
}

  // Método para mostrar el recorrido desde la base de inicio hasta la hora final
  crearRuta(baseInicio, horaInicio, horaFin) {
    if (!this.primero) return "";

    let actual = this.primero;
    let recorrido = "";
    let tiempo = 0;
    let horaActual = horaInicio;

    do {
      tiempo += actual.minutos;
      recorrido += `Nombre: ${actual.nombre}, Hora: ${horaActual}\n`;
      horaActual += actual.minutos;

      actual = actual.siguiente;

    } while (actual !== this.primero && horaActual <= horaFin);

    return recorrido;
 }
}
