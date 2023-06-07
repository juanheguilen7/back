import { Router } from "express";
import cartService from '../dao/service/carts.service.js';

const cartRouterAtlas = Router()

cartRouterAtlas.post('/', async (req, res) => {
   const newCart = await cartService.createCart();
   res.send('Carrito creado')
})

//llama a toods los carritos
cartRouterAtlas.get('/', async (req, res) => {
   const carts = await cartService.getAllCarts();

   res.send(carts);
})


cartRouterAtlas.delete('/:id', async (req, res) => {
   const id = req.params.id
   const delet = await cartService.deletCarrito(id);
   res.send("chau carrito");
})

cartRouterAtlas.get('/:id', async (req, res) => {
   const id = req.params.id;
   const findCart = await cartService.cartById(id);
   res.send(findCart);
})

cartRouterAtlas.post('/:idCart/product/:idProd/:quantity', async (req, res) => {
   const idCart = req.params.idCart;
   const idProd = req.params.idProd;
   const quantity = req.params.quantity;
   const addProduct = await cartService.addProdCart(idCart, idProd, quantity);
   res.send(addProduct);
})

export { cartRouterAtlas }

