import { MessagesModel } from "../models/messages.model.js";
import MessageDTO from "../../dto/messages.dto.js";

export default class MessagesService {
    async getMessages() {
        return await MessagesModel.find({}).select('user message');
    }

    async createModelUser(usuario) {
        const newUser = new MessageDTO(usuario);
        return await MessagesModel.create(newUser);
    }

    async saveMsj(dato) {
        const msj = [dato.msj];
        const chat = await MessagesModel.findOne({ email: dato.email });

        if (chat) {
            const before = chat.message;
            const after = [...before, ...msj];
            chat.message = after;
            return await chat.save();
        } else {
            return await MessagesModel.updateOne(
                { email: dato.email },
                { message: msj }
            );
        }
    }
}
