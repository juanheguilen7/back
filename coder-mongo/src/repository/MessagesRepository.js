import MessagesService from "../dao/service/messages.service";

class MessageRepository {
    constructor() {
        this.dao = new MessagesService()
    }
    async get() {
        const message = await this.dao.getMessages();
        return message
    }
    async save(msj) {
        const save = await this.dao.saveMsj(msj);
        return save
    }
    async add(user) {
        const newUser = await this.dao.createModelUser(user);
        return newUser;
    }
}

const messageReposository = new MessageRepository();

export default messageReposository;