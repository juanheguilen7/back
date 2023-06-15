import { MessagesModel } from "../models/messages.model.js"

class MessagesService {
    constructor() {
        this.model = MessagesModel;
    }
    async getMessages() {
        return await this.model.find({}).select('user message');
    }
    async createModelUser(usuario) {
        //crea el usuario con la estructura de model
        console.log(usuario);
        return await this.model.create(usuario);
    }

    async saveMsj(dato) {
        //recibo el msj, guardo en array
        let msj = []
        msj.push(dato.msj)
        //busco por email
        let chat =  await this.model.findOne({ email: dato.email });
        //si el array del msj es diferente a vacio
        if(chat.length != 0 ){
            let before = chat.message
            //pusheo en el array los mensajes
            let after = [...before, ...msj];
            chat.message = after;
            return await chat.save();
        }else{
            return await this.model.updateOne({email:dato.email},{message:msj});
        }

    }
};



const messagesService = new MessagesService();

export default messagesService