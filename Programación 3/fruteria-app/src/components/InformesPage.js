import React, { useState, useEffect } from 'react';

function InformesPage() {
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    // Realiza una solicitud al backend para obtener los informes de ventas
    fetch('/api/informes/informeVentasDiarias')
      .then((response) => response.json())
      .then((data) => {
        setInformes(data.informeVentasDiarias);
      })
      .catch((error) => console.error('Error al obtener los informes de ventas:', error));
  }, []);

  return (
    <div>
      <h2>Informes</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Total de Ventas</th>
          </tr>
        </thead>
        <tbody>
          {informes.map((informe) => (
            <tr key={informe.fecha}>
              <td>{informe.fecha}</td>
              <td>${informe.totalVentas.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InformesPage;
