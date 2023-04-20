class Calculator extends HTMLElement {

  constructor() {
    super();

    // Creamos un shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Añadimos el HTML de la calculadora al shadow DOM
    shadow.innerHTML = `
      <style>
        /* Estilos para la calculadora */
        .calculator {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 10px;
          padding: 10px;
          background-color: #eee;
          border: 1px solid #ccc;
        }
        .calculator button {
          font-size: 20px;
          padding: 10px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          cursor: pointer;
        }
        .calculator button:hover {
          background-color: #ccc;
        }
        .calculator button:active {
          background-color: #aaa;
        }
        .calculator input {
          font-size: 20px;
          padding: 10px;
          text-align: right;
        }
      </style>
      <div class="calculator">
        <input type="text" id="display" readonly>
        <button id="clear">C</button>
        <button id="backspace">&larr;</button>
        <button id="divide">/</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="multiply">*</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="subtract">-</button>
        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="add">+</button>
        <button id="negate">+/-</button>
        <button id="zero">0</button>
        <button id="decimal">.</button>
        <button id="equals">=</button>
      </div>
    `;

    // Obtenemos referencias a los elementos de la calculadora
    this.display = shadow.querySelector("#display");
    this.clearButton = shadow.querySelector("#clear");
    this.backspaceButton = shadow.querySelector("#backspace");
    this.divideButton = shadow.querySelector("#divide");
    this.sevenButton = shadow.querySelector("#seven");
    this.eightButton = shadow.querySelector("#eight");
    this.nineButton = shadow.querySelector("#nine");
    this.multiplyButton = shadow.querySelector("#multiply");
    this.fourButton = shadow.querySelector("#four");
    this.fiveButton = shadow.querySelector("#five");
    this.sixButton = shadow.querySelector("#six");
    this.subtractButton = shadow.querySelector("#subtract");
    this.oneButton = shadow.querySelector("#one");
    this.twoButton = shadow.querySelector("#two");
    this.threeButton = shadow.querySelector("#three");
    this.addButton = shadow.querySelector("#add");
    this.negateButton = shadow.querySelector("#negate");
    this.zeroButton = shadow.querySelector("#zero");
    this.decimalButton = shadow.querySelector("#decimal");
    this.equalsButton = shadow.querySelector("#equals");
    
    // Establecemos los listeners para los botones
    this.clearButton.addEventListener("click", () => {
      this.display.value = "";
    });
    
    this.backspaceButton.addEventListener("click", () => {
      this.display.value = this.display.value.slice(0, -1);
    });
    
    this.divideButton.addEventListener("click", () => {
      this.display.value += "/";
    });
    
    this.sevenButton.addEventListener("click", () => {
      this.display.value += "7";
    });
    
    this.eightButton.addEventListener("click", () => {
      this.display.value += "8";
    });
    
    this.nineButton.addEventListener("click", () => {
      this.display.value += "9";
    });
    
    this.multiplyButton.addEventListener("click", () => {
      this.display.value += "*";
    });
    
    this.fourButton.addEventListener("click", () => {
      this.display.value += "4";
    });
    
    this.fiveButton.addEventListener("click", () => {
      this.display.value += "5";
    });
    
    this.sixButton.addEventListener("click", () => {
      this.display.value += "6";
    });
    
    this.subtractButton.addEventListener("click", () => {
      this.display.value += "-";
    });
    
    this.oneButton.addEventListener("click", () => {
      this.display.value += "1";
    });
    
    this.twoButton.addEventListener("click", () => {
      this.display.value += "2";
    });
    
    this.threeButton.addEventListener("click", () => {
      this.display.value += "3";
    });
    
    this.addButton.addEventListener("click", () => {
      this.display.value += "+";
    });
    
    this.negateButton.addEventListener("click", () => {
      this.display.value = (-parseFloat(this.display.value)).toString();
    });
    
    this.zeroButton.addEventListener("click", () => {
      this.display.value += "0";
    });
    
    this.decimalButton.addEventListener("click", () => {
      if (!this.display.value.includes(".")) {
        this.display.value += ".";
      }
    });
    
    this.equalsButton.addEventListener("click", () => {
      try {
        const result = eval(this.display.value);
        this.display.value = result.toString();
      } catch (error) {
        this.display.value = "Error";
      }
    });
  }
}