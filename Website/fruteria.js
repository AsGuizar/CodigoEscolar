// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    // Recuperar el carrito del almacenamiento local (si existe)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar el producto al carrito
    carrito.push(producto);

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizar el contador del carrito en todas las páginas
    actualizarContadorCarrito();

    // Mostrar un mensaje de confirmación
    mostrarMensajeConfirmacion(producto.nombre);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    // Recuperar el carrito del almacenamiento local
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Eliminar el producto del carrito
    carrito.splice(index, 1);

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizar el contador del carrito en todas las páginas
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito en todas las páginas
function actualizarContadorCarrito() {
    // Recuperar el carrito del almacenamiento local
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Actualizar el contador en todas las páginas
    const contadorCarritoElements = document.querySelectorAll(".contador-carrito");
    contadorCarritoElements.forEach((element) => {
        element.textContent = carrito.length;
    });
}

// Función para mostrar un mensaje de confirmación
function mostrarMensajeConfirmacion(nombreProducto) {
    // Muestra un mensaje de confirmación en la página actual
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");
    mensajeConfirmacion.textContent = `¡${nombreProducto} ha sido agregado al carrito!`;
    setTimeout(() => {
        mensajeConfirmacion.textContent = "";
    }, 3000);
}

// Función para cargar el carrito al abrir cualquier página
function cargarCarrito() {
    actualizarContadorCarrito();
}

// Ejecutar la función para cargar el carrito al abrir cualquier página
cargarCarrito();
 document.addEventListener("DOMContentLoaded", function() {
    actualizarContadorCarrito();
});
