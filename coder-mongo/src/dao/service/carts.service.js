import { CartsModel } from "../models/carts.model.js";

class CartService {
    constructor() {
        this.model = CartsModel
    }

    //CREAR CARRITO
    async createCart() {
        const newCart = {
            idProd: '',
            quantity: 0
        }
        return await this.model.create(newCart);
    };

    //TRAE TODO LOS CARRITOS
    async getAllCarts() {
        return await this.model.find();
    };

    //BUSCAR CARRITO POR ID
    async cartById(idCart) {
        return await this.model.findOne({ _id: idCart }).populate('products.idProd')
    };

    //AGREGAR PRODUCTO
    async addProdCart(idCart, idProd, cantidad) {
        //busco producto por id
        let doc = await this.model.findById(idCart);
        //pusheo, el id del prod, y la cantidad
        doc.products.push({ idProd: idProd, quantity: cantidad });
        //guardo
        doc.save();
        return doc;
    };

    //ELIMINAR CARRITO
    async deletCarrito(idCart) {
        return await this.model.deleteOne({ _id: idCart });
    };

    //ELIMINO PRODUCTO DEL CARRITO POR ID
    async deletProd(idCart, prodId) {
        // Obtener el carrito por ID
        const cart = await this.cartById(idCart);
        // Buscar el producto en el array de productos del carrito
        const index = cart.products.findIndex(producto => producto.idProd.toString() === prodId);
        // Verificar si se encontró el producto
        if (index !== -1) {
            // Eliminar el producto del array de productos
            cart.products.splice(index, 1);
            // Actualizar el carrito en la base de datos
            await cart.save();
        }
        // Devolver el carrito actualizado
        return cart;
    };

    //MODIFICAR PRODUCTO FALTA
    async updateProd(idCart, idProd, quantity) {
        //busco carrito
        let cart = await this.cartById(idCart);
        //busco si existe el producto y lo ubico
        const index = cart.products.findIndex(producto => producto.idProd.toString() === idProd);

        //analizo que la cantidad que quiero modificar sea distinta a la que esta
        cart.products[index].quantity != quantity ? cart.products[index].quantity = quantity : cart.products[index].quantity;

        //lo actualizo
        await cart.save();

        //devuelvo actualizado
        return cart;
    }

}



const cartService = new CartService();
export default cartService;

