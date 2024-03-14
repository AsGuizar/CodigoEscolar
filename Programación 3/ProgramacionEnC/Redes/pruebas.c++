void loop() {
    // Secuencia para el primer semáforo
    digitalWrite(verde1, HIGH);  
    delay(10000); // Mantener el verde encendido durante 10 segundos
    digitalWrite(verde1, LOW);

    digitalWrite(amarillo1, HIGH);
    delay(500); // Encender el amarillo durante 500 ms
    delay(1000); // Apagar el amarillo durante 1000 ms
    digitalWrite(amarillo1, LOW); 

    digitalWrite(rojo1, HIGH); 
    delay(14500); // Mantener el rojo encendido durante 14.5 segundos
    digitalWrite(rojo1, LOW); 

    // Secuencia para el segundo semáforo
    digitalWrite(verde2, HIGH);  
    delay(10000); // Mantener el verde encendido durante 10 segundos
    digitalWrite(verde2, LOW);

    digitalWrite(amarillo2, HIGH);
    delay(500); // Encender el amarillo durante 500 ms
    delay(1000); // Apagar el amarillo durante 1000 ms
    digitalWrite(amarillo2, LOW); 

    digitalWrite(rojo2, HIGH); 
    delay(14500); // Mantener el rojo encendido durante 14.5 segundos
    digitalWrite(rojo2, LOW); 
}
