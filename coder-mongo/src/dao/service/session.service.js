import { UserModel } from "../models/user.model.js"
import UserDTO from "../../dto/user.dto.js";


export default class SessionService {
    async find() {
        return await UserModel.find();
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email: email }).populate('cartID');
    }

    async findById(id) {
        return await UserModel.findOne({ _id: id }).populate('cartID');
    }

    async create(newUser) {
        const newUserDTO = new UserDTO(newUser);
        return await UserModel.create(newUserDTO);
    }
}
