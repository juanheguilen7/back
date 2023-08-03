import CartRepository from "../../repository/CartsRepository.js";

class CartService {
    constructor() {
        this.repository = new CartRepository();
    }

    async createCart() {
        return await this.repository.createCart();
    }

    async getAllCarts() {
        return await this.repository.getAllCarts();
    }

    async getCartById(cartId) {
        return await this.repository.getCartById(cartId);
    }

    async addProductToCart(cartId, productId, quantity) {
        return await this.repository.addProductToCart(cartId, productId, quantity);
    }

    async deleteCart(cartId) {
        return await this.repository.deleteCart(cartId);
    }

    async emptyCart(cartId) {
        return await this.repository.emptyCart(cartId);
    }

    async deleteProductFromCart(cartId, productId) {
        return await this.repository.deleteProductFromCart(cartId, productId);
    }

    async updateProductInCart(cartId, productId, quantity) {
        return await this.repository.updateProductInCart(cartId, productId, quantity);
    }

    async updateProductsInCart(cartId, newProducts) {
        return await this.repository.updateProductsInCart(cartId, newProducts);
    }
}

const cartService = new CartService();
export default cartService;
