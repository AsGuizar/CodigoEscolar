import React, { useState, useEffect } from 'react';

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realiza la solicitud GET al servidor
    fetch('/api/productos')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data.productos);
      })
      .catch((error) => console.error('Error al obtener la lista de productos:', error));
  }, []); // El segundo argumento vacío asegura que se ejecute solo una vez

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.producto_id}>
            {producto.nombre} - {producto.categoria} - Precio: ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;
