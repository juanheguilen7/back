import CartService from "../dao/service/carts.service.js";

class CartRepository {
    constructor() {
        this.dao = new CartService();
    }

    async add() {
        const newCart = await this.dao.createCart();
        return newCart
    }

    async getCarts() {
        const carts = await this.dao.getAllCarts();
        return carts

    }
    async getById(id) {
        const cartId = await this.dao.getCartById(id);
        return cartId;

    }
    async push(id, prodId, quantity) {
        const push = await this.dao.addProductToCart(id, prodId,quantity);
        return push;
    }
    async delete(id) {
        const delet = await this.dao.deleteCart(id);
        return delet;

    }
    async empty(id) {
        const cart = await this.dao.emptyCart(id);
        return cart;
    }
    async deleteProd(id, prodId) {
        const cart = await this.dao.deleteProductFromCart(id, prodId);
        return cart;
    }

    async updateProd(id, product,quantity) {
        const update = this.dao.updateProductInCart(id, product,quantity);
        return update
    }

    async updateProducts(id, products) {
        const updates = this.dao.updateProductsInCart(id, products);
        return updates;
    }

}

const cartRepository = new CartRepository();

export default cartRepository;