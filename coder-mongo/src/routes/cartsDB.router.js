import { Router } from "express";
import cartRepository from "../repository/CartsRepository.js"
import { notForAdmin } from "../middleware/auth.middleware.js";
const cartRouterAtlas = Router();

//CREO CARRITO(funciona)
cartRouterAtlas.post('/', async (req, res) => {
   try {
      const newCart = await cartRepository.add();
      res.status(200).send(newCart)

   } catch (err) {

      res.status(404).send({ err })

   }
})

//LLAMO A TODOS LOS CARRITOS (funciona)
cartRouterAtlas.get('/', async (req, res) => {
   try {
      const carts = await cartRepository.getCarts();
      res.status(200).send(carts);

   }
   catch (err) {
      res.status(500).send({ err });
   }

})

//DEVUELVO POR ID(funciona)
cartRouterAtlas.get('/:cid', async (req, res) => {
   try {
      const id = req.params.cid;

      const findCart = await cartRepository.getById(id);

      console.log(findCart);
      //para poder acceder a los productos
      let send = JSON.parse(JSON.stringify(findCart.products));
      res.status(200).render('carts', { products: send });
   }
   catch (err) {
      res.status(501).send({ err });
   }
})

//AGREGO PROD AL CARRITO (funciona)
cartRouterAtlas.post('/:cid/product/:pid/:quantity', notForAdmin, async (req, res) => {
   try {
      const idCart = req.params.cid;
      const idProd = req.params.pid;
      const quantity = parseInt(req.params.quantity);
      console.log(quantity);
      const addProduct = await cartRepository.push(idCart, idProd, quantity);
      res.status(200).send(addProduct);
   }
   catch (err) {
      res.status(400).send({ err })
   }
})

//MODIFICO CANTIDAD DE PROD(funciona)
cartRouterAtlas.put('/:cid/products/:pid',notForAdmin, async (req, res) => {
   try {
      let idCart = req.params.cid;
      let idProd = req.params.pid;
      let quantity = req.body.quantity

      await cartRepository.updateProd(idCart, idProd, quantity);
      res.status(200).send('cantidad modificada');

   } catch (err) {
      res.status(500).send({ err });
   }

});

//ARRAY DE PRODS (funciona)
cartRouterAtlas.put('/:cid', async (req, res) => {
   try {
      let idCart = req.params.cid;
      //products es una array de obj [{idProd, quantity},{idProd, quantity}]
      let products = req.body;
      await cartRepository.updateProducts(idCart, products)
      res.status(200).send('Productos agregados')
   } catch (err) {
      res.status(400).send({ err })
   }
})

//ELIMINO PORD DEL CARRITO(funciona)
cartRouterAtlas.delete('/:cid/products/:pid', async (req, res) => {
   try {
      const id = req.params.cid //obtengo id del cart
      const prodId = req.params.pid//obtengo id del prod

      let deletProd = await cartRepository.deleteProd(id, prodId);//metodo que busca y carrito, y eliminar el prod que coincide.

      res.status(200).send(deletProd);//devuelvo el cart;
   } catch (err) {
      res.status(404).send({ err })
   }
});

//ELIMINO PRODUCTOS DEL CARRITO (funciona)
cartRouterAtlas.delete('/:cid', async (req, res) => {
   try {
      const id = req.params.cid//obtengo el id del cart
      const delet = await cartRepository.empty(id);//metodo que vacia los products
      res.status(200).send(delet);//devuelvo cart vacio;

   } catch (err) {
      res.status(501).send({ err });
   }
});

export { cartRouterAtlas };