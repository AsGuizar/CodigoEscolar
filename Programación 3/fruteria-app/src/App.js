import React, { useState, useEffect } from 'react';

function App() {
  // Estado para almacenar la lista de productos
  const [productos, setProductos] = useState([]);

  // Estado para almacenar los datos del formulario de registro de ventas
  const [ventaData, setVentaData] = useState({
    producto: 'manzanas', // Valor predeterminado
    cantidad: 1,          // Valor predeterminado
  });

  // Función para obtener la lista de productos desde el backend
  const obtenerProductos = async () => {
    try {
      // Realiza una solicitud a tu backend para obtener la lista de productos
      const response = await fetch('/api/productos'); // Ajusta la ruta de la API según tu configuración
      const data = await response.json();
      setProductos(data.productos);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }
  }

  // Función para registrar una venta
  const registrarVenta = async () => {
    try {
      // Realiza una solicitud al backend para registrar la venta
      const response = await fetch('/api/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventaData),
      });
      if (response.status === 200) {
        console.log('Venta registrada con éxito');
        // Actualiza la lista de productos después de la venta
        obtenerProductos();
      } else {
        console.error('Error al registrar la venta');
      }
    } catch (error) {
      console.error('Error al registrar la venta:', error);
    }
  }

  // Ejecuta la función de obtenerProductos al cargar la página
  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Frutería Mi Fruta Fresca</h1>
        <nav>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#ventas">Ventas</a></li>
            <li><a href="InformesPage.html">Informes</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="productos">
          <h2>Productos Disponibles</h2>
          <ul>
            {productos.map((producto) => (
              <li key={producto.id}>
                <h3>{producto.nombre}</h3>
                <p>Categoría: {producto.categoria}</p>
                <p>Precio: ${producto.precio}/unidad</p>
                <p>Stock: {producto.stock} unidades</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="ventas">
          <h2>Registro de Ventas</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            registrarVenta();
          }}>
            <label htmlFor="producto">Producto:</label>
            <select
              id="producto"
              name="producto"
              value={ventaData.producto}
              onChange={(e) => setVentaData({ ...ventaData, producto: e.target.value })}
            >
              {/* Opciones para productos */}
              <option value="manzanas">Manzanas</option>
              <option value="zanahorias">Zanahorias</option>
              {/* Agrega más opciones para productos */}
            </select>
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              min="1"
              value={ventaData.cantidad}
              onChange={(e) => setVentaData({ ...ventaData, cantidad: e.target.value })}
              required
            />
            <button type="submit">Registrar Venta</button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Frutería Mi Fruta Fresca</p>
      </footer>
    </div>
  );
}

export default App;

