/* import { UserModel } from "../models/user.model.js";

class UserService {
    constructor() {
        this.model = UserModel;
    }
    async getAll() {
        return await this.model.find();

    }
    async getByEmail(email) {
        return await this.model.findOne({ email: email });
    }
    async createUser(userData) {
        const newUser = new this.model(userData);
        return await newUser.save();
    }

}
const userService = new UserService();

export default userService; */