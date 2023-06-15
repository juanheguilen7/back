let btn = document.querySelectorAll('.btnAddCart');
let idCart = ''; // Variable para almacenar el ID del carrito
let id = '';

//evento que ejecuta el botón para recolectar el dato del producto
btn.forEach(boton => boton.addEventListener('click', (e) => {
    // Recopilo el id del producto
    id = `${e.target.value}`;

    if (!idCart) {
        // Si el ID del carrito no está definido, crear un nuevo carrito
        createCart()
            .then(cartId => {
                idCart = cartId; // Almacenar el ID del carrito para su posterior uso
                sendProd(idCart, id);
            })
            .catch(error => console.error('Error:', error));
    } else {
        // Si el ID del carrito ya está definido, simplemente agregar el producto al carrito existente
        sendProd(idCart, id);
    }
}));

//creo el carrito y recopilo el dato de su id
const createCart = () => {
    let url = "http://localhost:8080/api/carts/";

    return fetch(url, {
        method: 'POST',
    })
        .then(res => res.json())
        .then(data => idCart = data._id) // Asumiendo que el servidor devuelve el ID del carrito en la propiedad "cartId"
        .catch(err => console.log('Error', err));
};

// luego envío el id por fetch al carrito
const sendProd = (cartId, productId) => {
    console.log(cartId);
    console.log(productId);

    let url = `http://localhost:8080/api/carts/${cartId}/product/${productId}/5`;

    fetch(url, {
        method: 'POST',
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
};
