let btn = document.getElementById('btnData');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let code = document.getElementById('code').value;
    let stock = document.getElementById('stock').value;
    let category = document.getElementById('category').value;
    let status = false;

    if (stock != 0) {
        status = true;
    }


    const newProduct = {
        title,
        description,
        price,
        code,
        stock,
        category,
        status
    }

    const formData = new FormData();
    formData.append('product', JSON.stringify(newProduct));
    formData.append('file', document.getElementById('file').files[0]);

    recolectData(formData);
    //reseteo el form
    document.getElementById('updateForm').reset();
})

const recolectData = async (formData) => {
    //esta clase permite construir y enviar datos de formulario
    try {
        const response = await fetch('http://localhost:8080/api/products/update', {
            method: 'POST',
            body: formData //se envia el form data que contiene datos producto y file
        });
        if (response.ok) {
            alert('Se cargo correctamente el producto');
        } else {
            console.log('La solicitud falló con código de estado: ' + response.status);
        }

    } catch (error) {
        console.log('Error al realizar la solicitud:', error.message);
    }
}