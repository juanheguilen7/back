import { CartsModel } from "../models/carts.model.js";

class CartService {
    constructor() {
        this.model = CartsModel
    }

    async getAllCarts() {
        return await this.model.find();
    }

    async addProdCart(idCart, idProd, cantidad) {
        let doc = await this.model.findById(idCart);
        doc.idProd = idProd;
        doc.quantity = cantidad
        return await doc.save();
    }

    async deletCarrito(idCart) {
        return await this.model.deleteOne({ _id: idCart });
    }

    async cartById(idCart) {
        return await this.model.findOne({ _id: idCart })
    }
    async createCart() {
        const newCart = {
            idProd:'',
            quantity: 0
        }
        return await this.model.create(newCart);
    }

}



const cartService = new CartService();
export default cartService;

