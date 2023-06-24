import { UserModel } from "../models/user.model.js";

class SessionService {
    constructor() {
        this.model = UserModel;
    }

    async getAllUser() {
        return await this.model.find()
    };
    async getByEmail(email) {
        return await this.model.findOne({ email: email })
    };
    async getByid(id) {
        return await this.model.findOne({ _id: id })
    }
    async createUser(newUser) {
        return await this.model.create(newUser);
    }
}

const sessionService = new SessionService();

export default sessionService