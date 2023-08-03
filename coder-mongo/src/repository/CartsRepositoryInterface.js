export default class CartRepositoryInterface {
    createCart() { }
    getAllCarts() { }
    getCartById(cartId) { }
    addProductToCart(cartId, productId, quantity) { }
    deleteCart(cartId) { }
    emptyCart(cartId) { }
    deleteProductFromCart(cartId, productId) { }
    updateProductInCart(cartId, productId, quantity) { }
    updateProductsInCart(cartId, newProducts) { }
}
