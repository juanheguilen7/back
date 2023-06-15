import { Router } from "express";
import cartService from '../dao/service/carts.service.js';

const cartRouterAtlas = Router();

//CREO CARRITO
cartRouterAtlas.post('/', async (req, res) => {
   try {
      const newCart = await cartService.createCart();
      res.status(200).send(newCart)

   } catch (err) {

      res.status(404).send({ err })

   }
})

//LLAMO  ATODOS LOS CARRITOS
cartRouterAtlas.get('/', async (req, res) => {
   try {
      const carts = await cartService.getAllCarts();
      res.status(200).send(carts);

   }
   catch (err) {
      res.status(500).send({ err });
   }

})

//DEVUELVO POR ID
cartRouterAtlas.get('/:cid', async (req, res) => {
   try {
      const id = req.params.cid;

      const findCart = await cartService.cartById(id);

      //para poder acceder a los productos
      let send = JSON.parse(JSON.stringify(findCart.products));
      res.status(200).render('carts', { products: send });

   }
   catch (err) {
      res.status(501).send({ err });

   }
})

//AGREGO PROD AL CARRITO
cartRouterAtlas.post('/:cid/product/:pid/:quantity', async (req, res) => {
   try {
      const idCart = req.params.cid;
      const idProd = req.params.pid;
      const quantity = req.params.quantity;
      const addProduct = await cartService.addProdCart(idCart, idProd, quantity);
      res.status(200).send(addProduct);
   }
   catch (err) {
      res.status(400).send({ err })
   }
})

//MODIFICO CANTIDAD DE PROD
cartRouterAtlas.put('/:cid/products/:pid', async (req, res) => {
   try {
      let idCart = req.params.cid;
      let idProd = req.params.pid;
      let quantity = req.body.quantity

      await cartService.updateProd(idCart, idProd, quantity);
      res.status(200).send('cantidad modificada')

   } catch (err) {
      res.status(500).send({ err });
   }

});
cartRouterAtlas.put('/:cid', async (req, res) => {
   try {
      let idCart = req.params.cid;
      //products es una array de obj {id, quantity}
      let products = req.body;
      await cartService.updateProd(idCart, products)
      res.status(200).send('Productos agregados')

   } catch (err) {
      res.status(400).send({ err })

   }
})

//ELIMINO PORD DEL CARRITO
cartRouterAtlas.delete('/:cid/products/:pid', async (req, res) => {
   try {
      const id = req.params.cid
      const prodId = req.params.pid

      let traigo = await cartService.deletProd(id, prodId);

      res.status(200).send(traigo);

   } catch (err) {

      res.status(404).send({ err })

   }

});

//ELIMINO PRODUCTOS DEL CARRITO
cartRouterAtlas.delete('/:id', async (req, res) => {
   try {
      const id = req.params.id
      const delet = await cartService.vaciarCarrito(id);
      res.status(200).send(delet);

   } catch (err) {
      res.status(501).send({ err });
   }

});





export { cartRouterAtlas }

