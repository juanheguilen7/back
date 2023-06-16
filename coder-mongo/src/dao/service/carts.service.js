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
        //busco el cart con findOne y uso populate para mostrar todo el prodct por su id
        return await this.model.findOne({ _id: idCart }).populate('products.idProd')
    };

    //AGREGAR PRODUCTO
    async addProdCart(idCart, idProd, cantidad) {
        let doc = await this.model.findById(idCart);//busco producto por id
        //pusheo, el id del prod, y la cantidad
        doc.products.push({ idProd: idProd, quantity: cantidad });
        doc.save(); //guardo
        return doc;
    };

    //ELIMINAR CARRITO
    async deletCarrito(idCart) {
        return await this.model.deleteOne({ _id: idCart });
    };

    //vaciar carrito
    async vaciarCarrito(idCart) {
        const cart = await this.cartById(idCart);//busco el carrito por su id
        cart.products = [];//vacio el carrito;
        await cart.save();//guardo el cambio
        return cart;//retorno el carrito
    };

    //ELIMINO PRODUCTO DEL CARRITO POR ID
    async deletProd(idCart, prodId) {
        const cart = await this.cartById(idCart); // Obtener el carrito por ID
        const products = cart.products;//entro a productos

        let index = products.findIndex(prod => prod.idProd._id.toString() === prodId);//busco la condicion que tenga el mismo id
        console.log(index);
        if (index !== -1) {
            //si es correcto hago un splice modificando el array
            products.splice(index, 1);
            //
            cart.products = products;
            await cart.save();
        }
        return cart; // Devolver el carrito actualizado
    };

    //MODIFICAR PRODUCTO 
    async updateProd(idCart, idProd, quantity) {
        //busco carrito
        let cart = await this.cartById(idCart);
        let products = cart.products //entro a productos
        //recorro productos
        products.forEach((prod) => {
            const id = prod.idProd._id;//agarro de cada obj entro a idprod y a su _id
            const cantidad = prod.quantity;//agarro cantidad de cada prod
            //analizo si el id es igual al q le paso y si la cantidad es diferente de la q quiero
            if (id.toString() === idProd && cantidad != quantity) {
                prod.quantity = quantity; //modifico
            };
        })
        await cart.save(); //guardo 
        return cart;//devuelvo carrito actualizado
    }

    //CARGAR ARR DE PRODUCTS
    async updateProducts(idCart, arrProd) {
        let cart = await this.cartById(idCart);//llamo al carrito
        let products = cart.products;

        arrProd.forEach((newProd) => {
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
        return cart
    }
}

const cartService = new CartService();
export default cartService;