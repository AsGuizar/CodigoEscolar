// Definir los pines utilizados
const int pinIzquierda = 6;
const int pinDerecha = 5;
const int pinArriba = 9;
const int pinAbajo = 3;
const int pinCentro = 4;
const int boton = 2;

const int joyX = A0; // Pin analógico para el eje X del joystick
const int joyY = A1; // Pin analógico para el eje Y del joystick

void setup() {
    // Inicializar los pines de los LEDs como salidas
    pinMode(pinIzquierda, OUTPUT);
    pinMode(pinDerecha, OUTPUT);
    pinMode(pinArriba, OUTPUT);
    pinMode(pinAbajo, OUTPUT);
    pinMode(pinCentro, OUTPUT);
    pinMode(boton, INPUT_PULLUP);
    
    // Inicializar la comunicación serial a 9600 baudios
    Serial.begin(9600);
}

void loop() {
    // Leer los valores de los ejes X e Y del joystick
    int xValue = analogRead(joyX);
    int yValue = analogRead(joyY);
    
    // Mapear los valores de los ejes X e Y al rango de 0 a 255
    int intensityX1 = map(xValue, 528, 1023, 0, 255);
    int intensityX2 = map(xValue, 490, 0, 0, 255);
    int intensityY1 = map(yValue, 528, 1023, 0, 255);
    int intensityY2 = map(yValue, 490, 0, 0, 255);
    
    // Mostrar los valores en la consola serial
    Serial.print("Y: ");
    Serial.print(xValue);
    Serial.print(" | X: ");
    Serial.println(yValue);
    
    // Encender los LEDs basados en los valores de los ejes X e Y
    // Los LEDs se encienden cuando el joystick está en su dirección, con intensidad basada en la distancia desde el centro
    analogWrite(pinIzquierda, (xValue > 600) ? intensityX1 : LOW); // Enciende LED "Izquierda" con intensidad basada en la distancia al mover el joystick a la izquierda
    analogWrite(pinDerecha, (xValue < 400) ? intensityX2 : LOW); // Enciende LED "Derecha" con intensidad basada en la distancia al mover el joystick a la derecha
    analogWrite(pinArriba, (yValue > 600) ? intensityY1 : LOW); // Enciende LED "Arriba" con intensidad basada en la distancia al mover el joystick hacia arriba
    analogWrite(pinAbajo, (yValue < 400) ? intensityY2 : LOW); // Enciende LED "Abajo" con intensidad basada en la distancia al mover el joystick hacia abajo
    digitalWrite(pinCentro, digitalRead(boton) ? LOW : HIGH); // Enciende LED "Centro" cuando el botón del joystick está presionado
    
     // Pequeña pausa para evitar lecturas erráticas
}