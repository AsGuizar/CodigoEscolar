#include <LiquidCrystal_I2C.h>

// Definición de pines
#define SENSOR_HUMEDAD A0
#define VERDE 3
#define AZUL 5
#define ROJO 6
#define BTN 7
#define BUZZER 4
#define RELAY 2

int sensor = 0;

// Inicialización de LCD
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Variables globales 
int valorBtn = 0;
bool indicadorBuzzer = true;
bool modoAutomatico = false;

// Bytes personalizados para los caracteres especiales
byte gota_agua[] = {
  B00100,
  B00100,
  B01110,
  B11111,
  B11111,
  B11111,
  B11111,
  B01110
};

byte rayo[] = {
  B00011,
  B00110,
  B01111,
  B00110,
  B01100,
  B00110,
  B01100,
  B11000
};

// Prototipos de funciones
uint8_t obtenerHumedad();
void indicadorLED(uint16_t humedad);
bool verificarHumedad(uint16_t humedad);
void mostrarValores();
vo…
[14:41, 15/03/2024] Santiago8a: #include <LiquidCrystal_I2C.h>

// Definición de pines
#define SENSOR_HUMEDAD A0
#define VERDE 3
#define AZUL 5
#define ROJO 6
#define BTN 7
#define BUZZER 4
#define RELAY 2

int sensor = 0;

// Inicialización de LCD
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Variables globales 
int valorBtn = 0;
bool indicadorBuzzer = true;
bool modoAutomatico = false;

// Bytes personalizados para los caracteres especiales
byte gota_agua[] = {
  B00100,
  B00100,
  B01110,
  B11111,
  B11111,
  B11111,
  B11111,
  B01110
};

byte rayo[] = {
  B00011,
  B00110,
  B01111,
  B00110,
  B01100,
  B00110,
  B01100,
  B11000
};

// Prototipos de funciones
uint8_t obtenerHumedad();
void indicadorLED(uint16_t humedad);
bool verificarHumedad(uint16_t humedad);
void mostrarValores();
void reproducirMelodia(uint8_t cancion);
void activarModoAutomatico(bool activar);
void controlarBombaModoAutomatico(bool humedad);
void controlarBombaHumedad(uint8_t humedad);
void ejecutarModoAutomatico();
void modoManual();

// Configuración inicial
void setup() {
  Serial.begin(9600);

  // Inicialización de la LCD y definición de caracteres personalizados
  lcd.init();
  lcd.createChar(0, gota_agua);
  lcd.createChar(1, rayo);

  // Configuración de pines
  pinMode(VERDE, OUTPUT);
  pinMode(AZUL, OUTPUT);
  pinMode(ROJO, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(RELAY, OUTPUT);
  pinMode(BTN, INPUT);

  digitalWrite(RELAY, LOW);
}

// Bucle principal
void loop() {
   sensor = analogRead(SENSOR_HUMEDAD);
  // Control del botón con debounce
  if (digitalRead(BTN)) {
    valorBtn = !valorBtn;
    delay(200);
  }

  // Selección del modo de operación
  if (valorBtn == 0) {
    ejecutarModoAutomatico();
  } else {
    modoManual();
  }

  delay(1000);
}

// Función para obtener la humedad del suelo
uint8_t obtenerHumedad() {
  // Se mapea el valor de 0 a 1023 a un rango de 0 a 100
  return (uint16_t)map(analogRead(SENSOR_HUMEDAD), 0, 1008, 100, 0);
}


// Función para controlar el indicador LED según el nivel de humedad
void indicadorLED(uint8_t humedad) {
  if (humedad < 25) {
    analogWrite(VERDE, 0);
    analogWrite(AZUL, 0);
    analogWrite(ROJO, 255);
  } else if (humedad < 50) {
    analogWrite(VERDE, 255);
    analogWrite(AZUL, 255);
    analogWrite(ROJO, 0);
  } else if (humedad < 75) {
    analogWrite(VERDE, 255);
    analogWrite(AZUL, 255);
    analogWrite(ROJO, 255);
  } else if (humedad < 100) {
    analogWrite(VERDE, 255);
    analogWrite(AZUL, 0);
    analogWrite(ROJO, 0);
  } else {
    analogWrite(VERDE, 255);
    analogWrite(AZUL, 0);
    analogWrite(ROJO, 0);
  }
}

// Función para verificar si la humedad es aceptable
bool verificarHumedad(uint8_t humedad) {
  return humedad < 80;
}

// Función para mostrar valores en la LCD justificados a la derecha
void mostrarValores() {
  lcd.backlight();
  lcd.clear();
  
  // Primera línea: Humedad
  lcd.setCursor(0, 0);
  lcd.write(byte(0));
  lcd.print("Humedad: ");
  lcd.setCursor(12, 0); // Justificación a la derecha
  lcd.print(obtenerHumedad());
  lcd.print("%");
  
  // Segunda línea: Valor analógico
  lcd.setCursor(0, 1);
  lcd.write(byte(1));
  lcd.print("Analogo: ");
  lcd.setCursor(12, 1); // Justificación a la derecha
  lcd.print(analogRead(SENSOR_HUMEDAD));
}


// Función para reproducir una melodía en el buzzer
void reproducirMelodia(uint8_t cancion) {
  if (cancion == 1) {
    tone(BUZZER, 500, 500);
  } else {
    tone(BUZZER, 200, 500);
  }
}

// Función para activar o desactivar el modo automático
void activarModoAutomatico(bool activar) {
    modoAutomatico = activar;
}

// Función para controlar la bomba de agua cuando el modo automático está activado
void controlarBombaModoAutomatico(bool humedad) {
    if (modoAutomatico == true) {
        digitalWrite(RELAY, LOW);
    } else {
      digitalWrite(RELAY, HIGH);
    }
}

// Función para controlar la bomba de agua basada en el nivel de humedad
void controlarBombaHumedad(uint8_t humedad) {
    if (humedad > 85) {
        digitalWrite(RELAY, HIGH);
    } else {
        digitalWrite(RELAY, LOW);
    }
}

// Función para el modo automático
void ejecutarModoAutomatico() {
  if (indicadorBuzzer) {
    reproducirMelodia(1);
    indicadorBuzzer = false;
  }
  mostrarValores();
  Serial.print("Porcentaje humedad: ");
  Serial.print(sensor);
  Serial.println("%");
  indicadorLED(obtenerHumedad());
  controlarBombaModoAutomatico(verificarHumedad(obtenerHumedad())); // Control de la bomba de agua en modo automático
}

// Función para el modo manual
void modoManual() {
  if (!indicadorBuzzer) {
    reproducirMelodia(2);
    indicadorBuzzer = true;
  }

  digitalWrite(VERDE, 115);
  digitalWrite(AZUL, 0 );
  digitalWrite(ROJO, 161);
  controlarBombaHumedad(obtenerHumedad()); // Control de la bomba de agua basado en la humedad
}