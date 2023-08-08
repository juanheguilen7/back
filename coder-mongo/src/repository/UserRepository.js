import SessionService from "../dao/service/session.service";

class UserRepository {
    constructor() {
        this.dao = new SessionService();
    }
    async add(user) {
        const newUser = await this.dao.create(user);
        return newUser
    }

    async get() {
        const users = await this.dao.find();
        return users
    }
    async getByEmail(email) {
        const user = await this.dao.findByEmail(email);
        return user
    }

    async getById(id) {
        const user = await this.dao.findById(id);
        return user;
    }
}
const userRepository = new UserRepository()

export default userRepository;