import { Router } from "express";
import productService from "../dao/service/products.service.js";

const productsRouterAtlas = Router();

//renderizo la pagina 



//LLAMO PRODUCTOS
productsRouterAtlas.get('/', async (req, res) => {
    try {
        //parametros que puedo recibir en el get
        //estos dos por url
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        //estos dos por body
        //test va a recibir la categoria
        let test = req.query.test;

        let price = parseInt(req.body.price);


        !limit ? limit = 10 : limit;
        !page ? page = 1 : page;
        !test ? test = false : test;
        !price ? price = false : price;

        let products = await productService.getSomeProducts(limit, page, test, price);

        const response = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.prevPage : null,
            nextPage: products.hasNextPage ? products.nextPage : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}` : null,
            firstLink: `/api/products?page=1`,
            lastLink: `/api/products?page=${products.totalPages}`,
        };
        console.log(response)
        //SOLUCION QUE BUSQUE PARA PODER PASAR A RENDERIZAR ALGO QUE PUEDA BUSCAR
        let renderFind = JSON.parse(JSON.stringify(response.payload));
        res.status(200).render('products', { title: 'Products', find: renderFind });
       

    } catch (err) {
        res.status(400).send({ err })

    }
})

//agrego pord
productsRouterAtlas.post('/', async (req, res) => {
    try {
        const product = req.body;
        const downloadProduct = await productService.addProduct(product);
        res.status(200).send(`producto cargador ${downloadProduct}`)
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
        res.status(204).send("eliminado")

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