//variables para cart
let btn = document.querySelectorAll('.btnAddCart');
let idCart = ''; // Variable para almacenar el ID del carrito
let id = '';
let btnCart = document.getElementById('goToCart');
let btnStock = document.querySelectorAll('.carrito')

//logica filtrar elementos por precio
//obtengo el nodo de cada check
let checkPrice = document.querySelectorAll('.checkPrice');
//creo una variable precio vacia
let price = '';
//hago un for each para recorrer todos los nodos agregandole un evento, click
checkPrice.forEach((check) => {
    check.addEventListener('click', (e) => {
        priceFilter(e.target);
    })
})

//esta funcion modifica la URL segun el filtro seleccionado
const priceFilter = (target) => {
    //cuando el target es true, esta check
    if (target.checked) {
        //guarda el valor de ese check en la variable
        price = target.value;
        //toma el dato de la url actual 
        const currentURL = new URL(window.location.href);
        //busca los parametros de la url
        const searchParams = currentURL.searchParams;
        //crea la nueva query (en este caso price)
        const newQuery = `price=${price}`;
        //analizo que la query tenga price si es asi
        if (searchParams.has('price')) {
            //modifico el price
            searchParams.set('price', price);
        } else {
            //sino le agrego uno
            searchParams.append('price', price);
        }
        currentURL.search = searchParams.toString();
        const updatedURL = currentURL.toString();

        window.location.href = updatedURL;
        // Desmarcar los demás checkboxes no permite clickear todos a la vez
        checkPrice.forEach((check) => {

            if (check !== target) {
                check.checked = false;
            }
        });

    } else {
        price = null;
    }
}


// ...

//evento que ejecuta el botón para recolectar el dato del producto
btn.forEach(boton => boton.addEventListener('click', (e) => {
    // Recopilo el id del producto
    id = `${e.target.value}`;
    let counter = e.target.parentNode.querySelector('.counter');
    let quantity = parseInt(counter.value);

    if (!idCart) {
        // Si el ID del carrito no está definido, crear un nuevo carrito
        createCart()
            .then(cartId => {
                idCart = cartId; // Almacenar el ID del carrito para su posterior uso
                sendProd(idCart, id, quantity);
            })
            .catch(error => console.error('Error:', error));
    } else {
        // Si el ID del carrito ya está definido, simplemente agregar el producto al carrito existente
        sendProd(idCart, id, quantity); // Asegúrate de pasar "quantity" a la función "sendProd"
    }

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000
    }).showToast();
}));

// ...


//evento que suma o resta la cantidad de producto q quiero agregar al carrito//
btnStock.forEach(boton => boton.addEventListener('click', (e) => {
    //selecciono el boton q se toca
    let target = e.target.value;
    //selecciono el elemento padre el elemento en el que se esta ejecutando el codigo
    let counter = e.target.parentNode.querySelector('#counter');
    //selecciono el valor actual
    let valor = parseInt(counter.value);

    if (target === '-' && valor > 1) {
        counter.value = valor - 1;
    } else if (target === '+' && valor >= 1) {
        counter.value = valor + 1;
    }

}))

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

const sendProd = (cartId, productId, quantity) => {
    console.log(quantity);
    let url = `http://localhost:8080/api/carts/${cartId}/product/${productId}/${quantity}`;

    fetch(url, {
        method: 'POST',
    })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            updateCartButton(response._id); // Actualizar el estado del botón después de completar la operación
        });
};
const updateCartButton = (id) => {
    console.log(id)
    if (id) {
        btnCart.href = `http://localhost:8080/api/carts/${id}`;
        btnCart.classList.remove('d-none');
    }
};