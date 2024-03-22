
#define verde 8
#define amarillo 9
#define rojo 10
#define verde2 11
#define amarillo2 12
#define rojo2 13
  
void setup()
{
  pinMode(verde, OUTPUT);
  pinMode(amarillo, OUTPUT);
  pinMode(rojo, OUTPUT);
  pinMode(verde2, OUTPUT);
  pinMode(amarillo2, OUTPUT);
  pinMode(rojo2, OUTPUT);
}

void loop()
{
  digitalWrite(rojo, HIGH);           // se enciende el led rojo
  digitalWrite(verde2, HIGH);          // se enciende el led verde
	delay(10000);
  digitalWrite(verde2, LOW);           // se apaga el led verde
  digitalWrite(amarillo2, HIGH);
  	delay(1000);
  digitalWrite(amarillo2, LOW);
  	delay(500);
  digitalWrite(amarillo2, HIGH);
  	delay(1000);
  digitalWrite(amarillo2, LOW);
  	delay(500);
  digitalWrite(amarillo2, HIGH);
  	delay(1000);
  digitalWrite(amarillo2, LOW);
  digitalWrite(rojo, LOW);
  digitalWrite(rojo2, HIGH);
  digitalWrite(verde, HIGH);
  	delay(10000);
  digitalWrite(verde,LOW);
  digitalWrite(amarillo, HIGH);
  	delay(1000);
  digitalWrite(amarillo, LOW);
  	delay(500);
  digitalWrite(amarillo, HIGH);
  	delay(1000);
  digitalWrite(amarillo, LOW);
  	delay(500);
  digitalWrite(amarillo, HIGH);
  	delay(1000);
  digitalWrite(amarillo, LOW);
  digitalWrite(rojo, HIGH);
  digitalWrite(rojo2, LOW);}