const int trigPin = 2; // Pin del sensor de ultrasonido conectado al pin Trig
const int echoPin = 3; // Pin del sensor de ultrasonido conectado al pin Echo

const int ledRojo = 4; // Pin del LED rojo
const int ledAmarillo = 5; // Pin del LED amarillo
const int ledBlanco = 6; // Pin del LED blanco
const int ledVerde = 7; // Pin del LED verde

void setup() {
  Serial.begin(9600); // Iniciar la comunicación serial para mostrar el porcentaje en la consola
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  pinMode(ledRojo, OUTPUT); 
  pinMode(ledAmarillo, OUTPUT); 
  pinMode(ledBlanco, OUTPUT); 
  pinMode(ledVerde, OUTPUT); 
}

void loop() {
  long duration, distance;
  digitalWrite(trigPin, LOW); // Enviar un pulso LOW al pin Trig para activar el sensor
  delayMicroseconds(2); 
  digitalWrite(trigPin, HIGH); // Enviar un pulso HIGH al pin Trig para enviar la señal
  delayMicroseconds(10); 
  digitalWrite(trigPin, LOW); 
  
  duration = pulseIn(echoPin, HIGH); // Leer la duración del eco
  distance = (duration / 2) / 29.1; // Calcular la distancia en centímetros
  
  Serial.print("Distancia: ");
  Serial.print(distance);
  Serial.println(" cm");
  
  int porcentaje = map(distance, 0, 400, 0, 400); // Mapear la distancia a un porcentaje
  
  // Encender los LEDs según el porcentaje de distancia
  if (porcentaje >= 0 && porcentaje < 100) {
    digitalWrite(ledRojo, HIGH);
    digitalWrite(ledAmarillo, LOW);
    digitalWrite(ledBlanco, LOW);
    digitalWrite(ledVerde, LOW);
  } else if (porcentaje >= 25 && porcentaje < 200) {
    digitalWrite(ledRojo, LOW);
    digitalWrite(ledAmarillo, HIGH);
    digitalWrite(ledBlanco, LOW);
    digitalWrite(ledVerde, LOW);
  } else if (porcentaje >= 50 && porcentaje < 300) {
    digitalWrite(ledRojo, LOW);
    digitalWrite(ledAmarillo, LOW);
    digitalWrite(ledBlanco, HIGH);
    digitalWrite(ledVerde, LOW);
  } else if (porcentaje >= 75 && porcentaje < 400) {
    digitalWrite(ledRojo, LOW);
    digitalWrite(ledAmarillo, LOW);
    digitalWrite(ledBlanco, LOW);
    digitalWrite(ledVerde, HIGH);
  } else {
    digitalWrite(ledRojo, LOW);
    digitalWrite(ledAmarillo, LOW);
    digitalWrite(ledBlanco, LOW);
    digitalWrite(ledVerde, LOW);
  }
  
  delay(200); // Esperar medio segundo antes de volver a medir
}
