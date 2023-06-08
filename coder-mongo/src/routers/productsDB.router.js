import { Router } from "express";
import productService from "../dao/service/products.service.js";

const productsRouterAtlas = Router();

//LLAMO PRODUCTOS
productsRouterAtlas.get('/', async (req, res) => {
    try {
        //parametros que puedo recibir en el get
        //estos dos por url
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        //estos dos por body
        let category = req.body.category;
        let price = parseInt(req.body.price);


        !limit ? limit = 10 : limit;
        !page ? page = 1 : page;
        !category ? category = false : category;
        !price ? price = false : price;

        console.log(limit, page, category, price)
        let busqueda = await productService.getSomeProducts(limit, page, category, price)

        res.status(200).send(busqueda);

    } catch (err) {
        res.status(400).send({ err })

    }
})

//agrego pord
productsRouterAtlas.post('/', async (req, res) => {
    try {
        const product = req.body;
        const downloadProduct = await productService.addProduct(product);
        res.send(`producto cargador ${downloadProduct}`)
    }
    catch (err) {
        res.status(500).send(err)

    }
})

//elimino por id
productsRouterAtlas.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const delet = await productService.deletProd(id);
        res.send("eliminado")

    } catch (err) {

        res.status(401).send({ err })

    }

})

//modifico por id
productsRouterAtlas.put('/', async (req, res) => {
    try {
        const update = req.body
        const updateProd = await productService.updateProd(update.id, update.key, update.valor);
        res.status(200).send(updateProd);
    } catch (err) {
        res.status(501).send({ err })
    }

})

export { productsRouterAtlas };