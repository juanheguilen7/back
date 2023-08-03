import UserRepository from "../../repository/UserRepository.js";

class SessionService {
    constructor() {
        this.repository = new UserRepository();
    }

    async getAllUsers() {
        return await this.repository.getAllUsers();
    }

    async getUserByEmail(email) {
        return await this.repository.getUserByEmail(email);
    }

    async getUserById(id) {
        return await this.repository.getUserById(id);
    }

    async createUser(newUser) {
        return await this.repository.createUser(newUser);
    }
}

const sessionService = new SessionService();

export default sessionService;