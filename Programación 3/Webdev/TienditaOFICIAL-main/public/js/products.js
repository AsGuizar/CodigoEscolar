const loadProducts = () => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/products', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json()).then(products => {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';
        products.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product-item');
            div.innerHTML = `
                <h2>${product.nombre}</h2>
                <p>${product.precio} $</p>
                <button onclick="addToCart(${product.id}, '${product.nombre}', ${product.precio})">Agregar al carrito</button>
            `;
            productList.appendChild(div);
        });
    });
};

const addToCart = (id, nombre, precio) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.cantidad += 1;
    } else {
        cart.push({ id, nombre, precio, cantidad: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast('Producto añadido al carrito');
};

const showToast = (message) => {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
};

if (localStorage.getItem('token')) {
    loadProducts();
}
