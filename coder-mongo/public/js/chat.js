//inicio socket.io del lado del cliente
const socket = io();
//variables que voy a usar
let email;
let alias;
const inputMSJ = document.getElementById('msj');

//expresion para evaluar si es un mail o no
const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//alert donde pido el mail
Swal.fire({
    title: 'Bienvenido',
    input: 'text',
    text: 'Escribe tu Email',
    icon: 'success',
    //condiciono para que sea un mail lo q envia.
    inputValidator: (value) => {
        if (!value || !expresion.test(value)) {
            return 'no es un emails.'
        }
    },
    allowOutsideClick: false,
}).then((result) => {
    //recopilo dato
    email = result.value;
    //envio por socket el dato
    console.log(email)
    socket.emit('email', email);
    //ejecuto el nuevo alert a traves de una funcion
    aliasWrite();
})

//pido el alias por una 
const aliasWrite = () => {

    return Swal.fire({
        input: 'text',
        text: 'Escribe tu alias',
        icon: 'success'
    }).then((result) => {
        //evaluo que no sea nulo el resultado
        if (!result) {
            return 'Falta agregar alias.'
        }
        else {
            //agrego el alias, que es mi user
            alias = result.value
            console.log(alias)
            socket.emit('user', alias)
        }

    })
}
//evento para enviar el mensaje
inputMSJ.addEventListener('keyup', (event) => {
    //evaluo cuando se apreta Enter
    if (event.key === 'Enter') {

        let msj = inputMSJ.value;
        //evaluo que no sea mensaje vacio
        if (msj.trim().length > 0) {
            //emito el menssage
            socket.emit('message', { msj, email });
            inputMSJ.value = '';
        }
    }
});


const render = async (data) => {
    //tengo que renderizar los mensajes previos primero
    //recibo un array de obj, tengo usuarios y mensajes
    const html = data.map(element => {
        const mensajes = element.message.map(mensaje => `<p>${mensaje}</p>`).join('');
        return `
          <div>
            <strong>${element.user}:</strong>
            <em>${mensajes}</em>
          </div>
        `;
    }).join('');

    document.getElementById('messages').innerHTML = html;

}

// socket retoma los mensages guardados
socket.on('messages', (data) => {

    render(data)
});
