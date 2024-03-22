#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x20, 16, 2);  // Dirección I2C, número de columnas y filas

#define botonUp 2      // Pin del botón de navegación hacia arriba
#define botonDown 3    // Pin del botón de navegación hacia abajo
#define botonSelect 4  // Pin del botón de selección
#define botonReturn 5  // Pin del botón de regreso
#define pinBuzzer 7    // Pin del buzzer

int opcionSeleccionada = 0;  // Variable para almacenar la opción seleccionada en el menú principal
int subopcionSeleccionada = 0;  // Variable para almacenar la opción seleccionada en el menú secundario

const int totalOpciones = 3;  // Número total de opciones en el menú principal
const int totalSubopciones = 3;  // Número total de opciones en el menú secundario

// Matrices para almacenar las opciones de los menús
const char* menuPrincipal[] = {"Paramecia.", "Zoan.     ", "Logia.      "};
const char* subMenu1[] = {"Gomu Gomu No Mi.    ", "Ope Ope No Mi.    ", "Gura Gura No Mi.   "};
const char* subMenu2[] = {"Hito Hito No Mi.   ", "Ushi Ushi No Mi.   ", "Uo Uo no Mi.  "};
const char* subMenu3[] = {"Mera Mera No Mi.  ", "Yami Yami No Mi.  ", "Moku Moku no Mi.  "};

bool borrarPantalla = false;  // Variable para controlar si debes borrar la pantalla

void hacerSonarBuzzer(int frecuencia, int duracion) {
  tone(pinBuzzer, frecuencia, duracion);
  delay(duracion);  // Pausa para que el tono sea escuchado completamente
  noTone(pinBuzzer);  // Detener el sonido del buzzer
}

void setup() {
  lcd.init();
  lcd.backlight();
  pinMode(pinBuzzer, OUTPUT);  // Configurar el pin del buzzer como salida
  Serial.begin(9600);
}

void loop() {
  // Determinar si estamos en el menú principal o en un submenú
  if (subopcionSeleccionada == 0) {
    // Menú principal
    if (borrarPantalla) {
      lcd.clear();
      borrarPantalla = false;  // Reiniciar la variable después de borrar la pantalla
    }
    lcd.setCursor(0, 0);
    lcd.print(menuPrincipal[opcionSeleccionada]);

    // Manejar la navegación del menú principal
    if (digitalRead(botonUp)) {
      delay(200);  // Debouncing
      opcionSeleccionada = (opcionSeleccionada - 1 + totalOpciones) % totalOpciones;
      hacerSonarBuzzer(1000, 100);  // Hacer sonar el buzzer al navegar hacia arriba
    }

    if (digitalRead(botonDown)) {
      delay(200);  // Debouncing
      opcionSeleccionada = (opcionSeleccionada + 1) % totalOpciones;
      hacerSonarBuzzer(1000, 100);  // Hacer sonar el buzzer al navegar hacia abajo
    }

    if (digitalRead(botonSelect)) {
      delay(200);  // Debouncing
      // Entrar al submenú correspondiente
      subopcionSeleccionada = 1;  // Reiniciar subopcionSeleccionada a 1 al entrar al submenú
      hacerSonarBuzzer(1500, 200);  // Hacer sonar el buzzer al entrar al submenú
    }

    if (digitalRead(botonReturn)) {
      delay(200);  // Debouncing
      // Puede agregar código adicional para la acción de retorno si es necesario
      hacerSonarBuzzer(1200, 100);  // Hacer sonar el buzzer al regresar al menú principal
    }
  } else {
    // Submenú
    if (borrarPantalla) {
      lcd.clear();
      borrarPantalla = false;  // Reiniciar la variable después de borrar la pantalla
    }
    lcd.setCursor(0, 0);
    lcd.print(getSubMenu()[subopcionSeleccionada - 1]);  // Usar subopcionSeleccionada - 1

    // Manejar la navegación del submenú
    if (digitalRead(botonUp)) {
      delay(200);  // Debouncing
      // Verificar si ya estamos en la primera subopción antes de cambiar a la anterior
      if (subopcionSeleccionada > 1) {
        subopcionSeleccionada = (subopcionSeleccionada - 1);
        hacerSonarBuzzer(1200, 100);  // Hacer sonar el buzzer al navegar hacia arriba en el submenú
      }
    }

    if (digitalRead(botonDown)) {
      delay(200);  // Debouncing
      // Verificar si ya estamos en la última subopción antes de cambiar a la siguiente
      if (subopcionSeleccionada < totalSubopciones) {
        subopcionSeleccionada = (subopcionSeleccionada + 1);
        hacerSonarBuzzer(1200, 100);  // Hacer sonar el buzzer al navegar hacia abajo en el submenú
      }
    }

    if (digitalRead(botonSelect)) {
      delay(200);  // Debouncing
      // Realizar acción asociada a la opción seleccionada del submenú
      realizarAccion(subopcionSeleccionada - 1, getSubMenu());  // Usar subopcionSeleccionada - 1
      hacerSonarBuzzer(1500, 200);  // Hacer sonar el buzzer al seleccionar una opción en el submenú
    }

    if (digitalRead(botonReturn)) {
      delay(200);  // Debouncing
      // Salir del submenú
      subopcionSeleccionada = 0;
      borrarPantalla = true;  // Establecer la variable para borrar la pantalla la próxima vez
      hacerSonarBuzzer(1200, 100);  // Hacer sonar el buzzer al regresar al menú principal
    }
  }
}

void realizarAccion(int opcion, const char* submenu[]) {
  // Realizar la acción correspondiente a la opción seleccionada del submenú
  Serial.print("Accion seleccionada en el submenu: ");
  Serial.println(submenu[opcion]);
}

// Obtener el puntero al submenú actual
const char** getSubMenu() {
  switch (opcionSeleccionada) {
    case 0:
      return subMenu1;
    case 1:
      return subMenu2;
    case 2:
      return subMenu3;
    default:
      return subMenu1;
  }
}
