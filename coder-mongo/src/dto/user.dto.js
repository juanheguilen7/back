export default class UserDTO {
    constructor({ first_name, last_name, email, age, password, cartID, role }) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.age = age;
        this.password = password;
        this.cartID = cartID;
        this.role = role;
    }
}