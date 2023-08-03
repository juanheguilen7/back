import UserRepositoryInterface from "./UserRepositoryInterface.js";
import { UserModel } from "../dao/models/user.model.js";
import UserDTO from "../dto/user.dto.js";

export default class UserRepository extends UserRepositoryInterface {
    async getAllUsers() {
        return await UserModel.find();
    }

    async getUserByEmail(email) {
        return await UserModel.findOne({ email: email }).populate('cartID');
    }

    async getUserById(id) {
        return await UserModel.findOne({ _id: id }).populate('cartID');
    }

    async createUser(newUser) {
        const newUserDTO = new UserDTO(newUser);
        return await UserModel.create(newUserDTO);
    }
}