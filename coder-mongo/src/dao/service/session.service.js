import { UserModel } from "../models/user.model.js";
import UserDTO from "../../dto/user.dto.js";

class SessionService {
    constructor() {
        this.model = UserModel;
    }

    async getAllUser() {
        return await this.model.find()
    };
    async getByEmail(email) {
        return await this.model.findOne({ email: email }).populate('cartID')
    };
    async getByid(id) {
        return await this.model.findOne({ _id: id }).populate('cartID')
    }
    async createUser(newUser) {
        let nuevo = new UserDTO(newUser) //usando DTO
        return await this.model.create(nuevo);
    }
}

const sessionService = new SessionService();

export default sessionService