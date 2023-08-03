import CartRepositoryInterface from "./CartsRepositoryInterface.js";
import { CartsModel } from "../dao/models/carts.model.js";

export default class CartRepository extends CartRepositoryInterface {
    async createCart() {
        const newCart = {
            idProd: '',
            quantity: 0
        };
        return await CartsModel.create(newCart);
    }

    async getAllCarts() {
        return await CartsModel.find();
    }

    async getCartById(cartId) {
        return await CartsModel.findOne({ _id: cartId }).populate('products.idProd');
    }

    async addProductToCart(cartId, productId, quantity) {
        let cart = await CartsModel.findById(cartId);
        cart.products.push({ idProd: productId, quantity: quantity });
        await cart.save();
        return cart;
    }

    async deleteCart(cartId) {
        return await CartsModel.deleteOne({ _id: cartId });
    }

    async emptyCart(cartId) {
        const cart = await this.getCartById(cartId);
        cart.products = [];
        await cart.save();
        return cart;
    }

    async deleteProductFromCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        const products = cart.products;
        const index = products.findIndex(
            (prod) => prod.idProd._id.toString() === productId
        );
        if (index !== -1) {
            products.splice(index, 1);
            cart.products = products;
            await cart.save();
        }
        return cart;
    }

    async updateProductInCart(cartId, productId, quantity) {
        let cart = await this.getCartById(cartId);
        let products = cart.products;
        products.forEach((prod) => {
            const id = prod.idProd._id;
            const cantidad = prod.quantity;
            if (id.toString() === productId && cantidad !== quantity) {
                prod.quantity = quantity;
            }
        });
        await cart.save();
        return cart;
    }

    async updateProductsInCart(cartId, newProducts) {
        let cart = await this.getCartById(cartId);
        let products = cart.products;
        newProducts.forEach((newProd) => {
            const index = products.findIndex(
                (prod) => prod.idProd._id.toString() === newProd.idProd
            );
            if (index !== -1) {
                products[index].quantity += newProd.quantity;
            } else {
                products.push(newProd);
            }
        });
        await cart.save();
        return cart;
    }
}