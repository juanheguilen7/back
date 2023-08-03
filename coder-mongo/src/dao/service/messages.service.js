import MessagesRepository from "../../repository/MessagesRepository.js";

class MessagesService {
    constructor() {
        this.repository = new MessagesRepository();
    }

    async getMessages() {
        return await this.repository.getMessages();
    }

    async createModelUser(usuario) {
        return await this.repository.createModelUser(usuario);
    }

    async saveMsj(dato) {
        return await this.repository.saveMsj(dato);
    }
}

const messagesService = new MessagesService();
export default messagesService