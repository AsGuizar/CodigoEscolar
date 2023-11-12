class Proceso {
    constructor(ciclos) {
      this.ciclos = ciclos;
      this.siguiente = null;
      this.anterior = null;
    }
  }
  
  class ListaCircular {
    constructor() {
      this.primero = null;
      this.ultimo = null;
    }
  
    agregar(ciclos) {
      const nuevoProceso = new Proceso(ciclos);
  
      if (!this.primero) {
        this.primero = nuevoProceso;
        this.ultimo = nuevoProceso;
        nuevoProceso.siguiente = nuevoProceso;
        nuevoProceso.anterior = nuevoProceso;
      } else {
        nuevoProceso.siguiente = this.primero;
        nuevoProceso.anterior = this.ultimo;
        this.ultimo.siguiente = nuevoProceso;
        this.primero.anterior = nuevoProceso;
        this.ultimo = nuevoProceso;
      }
    }
  
    extraerInicio() {
      if (!this.primero) {
        return null;
      }
  
      const proceso = this.primero;
      if (this.primero === this.ultimo) {
        this.primero = null;
        this.ultimo = null;
      } else {
        this.primero = proceso.siguiente;
        this.ultimo.siguiente = this.primero;
        this.primero.anterior = this.ultimo;
      }
  
      return proceso;
    }
  }
  