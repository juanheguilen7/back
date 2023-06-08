import { Router } from "express";
import cartService from '../dao/service/carts.service.js';

const cartRouterAtlas = Router();

//CREO CARRITO
cartRouterAtlas.post('/', async (req, res) => {
   const newCart = await cartService.createCart();
   res.send('Carrito creado')

})

//LLAMO  ATODOS LOS CARRITOS
cartRouterAtlas.get('/', async (req, res) => {
   const carts = await cartService.getAllCarts();
   res.send(carts);

})

//DEVUELVO POR ID
cartRouterAtlas.get('/:cid', async (req, res) => {
   const id = req.params.cid;
   const findCart = await cartService.cartById(id);
   res.send(findCart);

})

//AGREGO PROD AL CARRITO
cartRouterAtlas.post('/:idCart/product/:idProd/:quantity', async (req, res)=> {
   const idCart = req.params.idCart;
   const idProd = req.params.idProd;
   const quantity = req.params.quantity;
   const addProduct = await cartService.addProdCart(idCart, idProd, quantity);
   res.send(addProduct);

})
//MODIFICO CANTIDAD DE PROD
cartRouterAtlas.put('/:cid/product/:pid', async (req, res) => {
   let idCart = req.params.cid;
   let idProd = req.params.pid;
   let quantity = req.body.quantity

   await cartService.updateProd(idCart, idProd, quantity);
   res.send('cantidad modificada')
});

//ELIMINO PORD DEL CARRITO
cartRouterAtlas.delete('/:cid/products/:pid', async (req, res) => {
   const id = req.params.cid
   const prodId = req.params.pid

   let traigo = await cartService.deletProd(id, prodId);

   res.send(traigo);

});

//ELIMINO CARRITO
cartRouterAtlas.delete('/:id', async (req, res) => {
   const id = req.params.id
   const delet = await cartService.deletCarrito(id);
   res.send("chau carrito");

});





export { cartRouterAtlas }

