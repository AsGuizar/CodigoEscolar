-- Tabla para Aeropuertos
CREATE TABLE Aeropuerto (
   Codigo CHAR(3) PRIMARY KEY,
   Nombre VARCHAR(255),
   Ciudad VARCHAR(255),
   NumeroPistas INT
);

-- Tabla para Compañías Aéreas
CREATE TABLE CompaniaAerea (
   CIF CHAR(10) PRIMARY KEY,
   Nombre VARCHAR(255),
   Nacionalidad VARCHAR(255),
   DireccionSede VARCHAR(255),
   Telefonos VARCHAR(255),
   NumAvionesAprox INT,
   Tipo VARCHAR(15)
);

-- Tabla para Personal
CREATE TABLE Personal (
   NumeroIdentificacion CHAR(10) PRIMARY KEY,
   Nacionalidad VARCHAR(255),
   PaisResidencia VARCHAR(255),
   Nombre VARCHAR(255),
   PrimerApellido VARCHAR(255),
   SegundoApellido VARCHAR(255),
   Direccion VARCHAR(255),
   IdiomaMaterno VARCHAR(255),
   Tipo VARCHAR(15)
);

-- Tabla para Pilotos
CREATE TABLE Piloto (
   TipoPermiso VARCHAR(255),
   UltimaEvaluacion DATE,
   CompaniaAereaCIF CHAR(10),
   FOREIGN KEY (CompaniaAereaCIF) REFERENCES CompaniaAerea(CIF)
);

-- Tabla para Miembros de Tripulación de Cabina
CREATE TABLE MiembroTripulacionCabina (
   ListaIdiomas VARCHAR(255),
   NumeroTelefono VARCHAR(15),
   CompaniaAereaCIF CHAR(10),
   FOREIGN KEY (CompaniaAereaCIF) REFERENCES CompaniaAerea(CIF)
);

-- Tabla para Operarios de Tierra
CREATE TABLE OperarioTierra (
   TipoTareas VARCHAR(255),
   PermisoMercanciasPeligr CHAR(3),
   CompaniaAereaCIF CHAR(10),
   FOREIGN KEY (CompaniaAereaCIF) REFERENCES CompaniaAerea(CIF)
);

-- Tabla para Aviones
CREATE TABLE Avion (
   Codigo CHAR(10) PRIMARY KEY,
   Modelo VARCHAR(255),
   MaxKmSinRepostar INT,
   MaxPasajeros INT,
   NumTripulacionRequerida INT,
   FechaUltimaInspeccion DATE,
   CompaniaAereaCIF CHAR(10),
   RutaAsignadaCodigo CHAR(10),
   FOREIGN KEY (CompaniaAereaCIF) REFERENCES CompaniaAerea(CIF),
   FOREIGN KEY (RutaAsignadaCodigo) REFERENCES Ruta(Codigo)
);

-- Tabla para Rutas
CREATE TABLE Ruta (
   Codigo CHAR(10) PRIMARY KEY,
   AeropuertoOrigenCodigo CHAR(3),
   AeropuertoDestinoCodigo CHAR(3),
   DuracionHoras INT,
   PilotoAsignadoNumeroIdent CHAR(10),
   FOREIGN KEY (AeropuertoOrigenCodigo) REFERENCES Aeropuerto(Codigo),
   FOREIGN KEY (AeropuertoDestinoCodigo) REFERENCES Aeropuerto(Codigo),
   FOREIGN KEY (PilotoAsignadoNumeroIdent) REFERENCES Piloto(NumeroIdentificacion)
);

-- Tabla para la relación Permiso para Utilizar
CREATE TABLE PermisoUtilizar (
   CompaniaAereaCIF CHAR(10),
   AeropuertoCodigo CHAR(3),
   PRIMARY KEY (CompaniaAereaCIF, AeropuertoCodigo),
   FOREIGN KEY (CompaniaAereaCIF) REFERENCES CompaniaAerea(CIF),
   FOREIGN KEY (AeropuertoCodigo) REFERENCES Aeropuerto(Codigo)
);

-- Tabla para la relación Alquiler de Aviones
CREATE TABLE AlquilerAviones (
   CompaniaAereaCIF CHAR(10),
   AvionCodigo CHAR(10),
   PRIMARY KEY (CompaniaAereaCIF, AvionCodigo),
   FOREIGN KEY (CompaniaAereaCIF) REFERENCES CompaniaAerea(CIF),
   FOREIGN KEY (AvionCodigo) REFERENCES Avion(Codigo)
);

-- Tabla para la relación Área de Actuación
CREATE TABLE AreaActuacion (
   CompaniaContinentalCIF CHAR(10),
   Pais VARCHAR(255),
   PRIMARY KEY (CompaniaContinentalCIF, Pais),
   FOREIGN KEY (CompaniaContinentalCIF) REFERENCES CompaniaAerea(CIF)
);

-- Tabla para la relación Controles de Compañía Internacional
CREATE TABLE ControlesCompaniaInternacional (
   CompaniaInternacionalCIF CHAR(10),
   ControlesOficiales VARCHAR(255),
   PRIMARY KEY (CompaniaInternacionalCIF, ControlesOficiales),
   FOREIGN KEY (CompaniaInternacionalCIF) REFERENCES CompaniaAerea(CIF)
);

-- Tabla para la relación Trabajo en Compañía
CREATE TABLE TrabajoEnCompania (
   PersonalNumeroIdentificacion CHAR(10),
   CompaniaAereaCIF CHAR(10),
   PRIMARY KEY (PersonalNumeroIdentificacion, CompaniaAereaCIF),
   FOREIGN KEY (PersonalNumeroIdentificacion) REFERENCES Personal(NumeroIdentificacion),
   FOREIGN KEY (CompaniaAereaCIF) REFERENCES CompaniaAerea(CIF)
);

-- Tabla para la relación Trabajo en Avión
CREATE TABLE TrabajoEnAvion (
   PersonalNumeroIdentificacion CHAR(10),
   AvionCodigo CHAR(10),
   PRIMARY KEY (PersonalNumeroIdentificacion, AvionCodigo),
   FOREIGN KEY (PersonalNumeroIdentificacion) REFERENCES Personal(NumeroIdentificacion),
   FOREIGN KEY (AvionCodigo) REFERENCES Avion(Codigo)
);

-- Tabla para la relación Ruta Asignada
CREATE TABLE RutaAsignada (
   RutaCodigo CHAR(10),
   AvionCodigo CHAR(10),
   PRIMARY KEY (RutaCodigo, AvionCodigo),
   FOREIGN KEY (RutaCodigo) REFERENCES Ruta(Codigo),
   FOREIGN KEY (AvionCodigo) REFERENCES Avion(Codigo)
);
