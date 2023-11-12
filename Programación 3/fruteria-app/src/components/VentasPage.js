import React, { useState, useEffect } from 'react';

function VentasPage() {
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    producto: '',
    cantidad: 0,
    total: 0,
  });

  useEffect(() => {
    // Realiza una solicitud al backend para obtener la lista de ventas y actualiza el estado "ventas".
    fetch('/api/ventas') // Asegúrate de que la ruta sea la correcta
      .then((response) => response.json())
      .then((data) => {
        setVentas(data.ventas);
      })
      .catch((error) => console.error('Error al obtener la lista de ventas:', error));
  }, []);

  const handleVentaSubmit = () => {
    // Realiza una solicitud al backend para registrar una nueva venta.
    // Actualiza la lista de ventas después de registrar la venta.
    fetch('/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaVenta),
    })
      .then((response) => response.json())
      .then(() => {
        // Actualiza la lista de ventas después de registrar la venta
        // Puedes realizar una nueva solicitud para obtener la lista actualizada
      })
      .catch((error) => console.error('Error al registrar la venta:', error));
  };

  return (
    <div>
      <h2>Registro de Ventas</h2>
      <form onSubmit={handleVentaSubmit}>
        {/* Resto del formulario para ingresar la fecha y el total de la venta */}
      </form>

      <h2>Lista de Ventas</h2>
      <ul>
        {ventas.map((venta) => (
          <li key={venta.id}>
            {/* Muestra los detalles de cada venta */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VentasPage;
