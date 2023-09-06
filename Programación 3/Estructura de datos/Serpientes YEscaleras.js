class JuegoSerpientesEscaleras {
    constructor() {
      this.jugadores = ["Jugador 1", "Jugador 2"];
      this.posiciones = [0, 0]; // Posición actual de cada jugador
      this.meta = 100; // La meta para ganar el juego
      this.tablero = this.inicializarTablero();
    }
  
    inicializarTablero() {
      const tablero = new Array(this.meta + 1).fill(0);
  
      // Agregar serpientes y escaleras de forma aleatoria
      const numSerpientes = Math.floor(Math.random() * 3) + 8; // Entre 8 y 10 serpientes
      const numEscaleras = Math.floor(Math.random() * 3) + 8; // Entre 8 y 10 escaleras
  
      for (let i = 0; i < numSerpientes; i++) {
        const inicio = Math.floor(Math.random() * this.meta) + 1;
        const fin = Math.floor(Math.random() * inicio) + 1;
        tablero[inicio] = -1 * (inicio - fin); // Marcar serpiente como un número negativo
      }
  
      for (let i = 0; i < numEscaleras; i++) {
        const inicio = Math.floor(Math.random() * this.meta) + 1;
        const fin = Math.floor(Math.random() * (this.meta - inicio)) + 1;
        tablero[inicio] = fin;
      }
  
      return tablero;
    }
  
    tirarDado() {
      return Math.floor(Math.random() * 6) + 1; // Dado de 6 caras
    }
  
    jugar() {
      let turno = 0;
      while (true) {
        const jugador = this.jugadores[turno];
        const tirada = this.tirarDado();
        this.posiciones[turno] += tirada;
  
        if (this.posiciones[turno] >= this.meta) {
          console.log(`${jugador} ha ganado el juego!`);
          break;
        }
  
        if (this.tablero[this.posiciones[turno]] !== 0) {
          const movimiento = this.tablero[this.posiciones[turno]];
          this.posiciones[turno] += movimiento;
          console.log(`${jugador} cayó en una ${movimiento > 0 ? 'escalera' : 'serpiente'} y se movió ${Math.abs(movimiento)} espacios a la casilla ${this.posiciones[turno]}.`);
        } else {
          console.log(`${jugador} tiró un ${tirada} y está en la casilla ${this.posiciones[turno]}.`);
        }
  
        turno = 1 - turno; // Alternar turnos entre los jugadores
      }
    }
  }
  
  const juego = new JuegoSerpientesEscaleras();
  juego.jugar();
  