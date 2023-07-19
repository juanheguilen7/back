import { Router } from "express";
import productService from "../dao/service/products.service.js";
import multer from "multer";
import { isAdmin, isAuth, isGuest } from "../middleware/auth.middleware.js";

const productsRouterAtlas = Router();
const upload = multer();
//LLAMO PRODUCTOS
productsRouterAtlas.get('/', isGuest, async (req, res) => {
    try {
        //parametros que puedo recibir en el get
        //estos dos por url
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        //estos dos por body
        //test va a recibir la categoria
        let test = req.query.test;

        let price = parseInt(req.query.price);


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
        //SOLUCION QUE BUSQUE PARA PODER PASAR A RENDERIZAR ALGO QUE PUEDA BUSCAR
        const user = req.session.user;
        let usuario = user;

        let renderFind = JSON.parse(JSON.stringify(response.payload));
        res.status(200).render('products', { title: 'Products', find: renderFind, usuario });


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
productsRouterAtlas.delete('/:id', isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const delet = await productService.deletProd(id);
        res.status(204).send("eliminado")
    } catch (err) {

        res.status(401).send({ err })
    }
})

//modifico por id asdasdasd asdasdasd
productsRouterAtlas.put('/', isAdmin, async (req, res) => {
    try {
        const update = req.body
        const updateProd = await productService.updateProd(update.id, update.key, update.valor);
        res.status(200).send(updateProd);
    } catch (err) {
        res.status(501).send({ err })
    }
})

//renderizo la vista para cargar el producto
productsRouterAtlas.get('/update', isAdmin, (req, res) => {
    res.render('updateProduct');
});

//metodo que crea un producto
productsRouterAtlas.post('/update', upload.single('file'), async (req, res) => {
    try {
        //recibo un objeto, con product, y img, product es un JSON, y img es un obj{}
        const productJSON = req.body;
        //parseo product, para hacerlo obj
        const product = JSON.parse(productJSON.product);
        //file es un objeto, con los campos,fieldname, originalname,encoding,mimetype,buffer y size

        //armo el nuevo obj que tengo que mandar a service para que guarde en mongo
        const newProd = {
            ...product,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }
        await productService.addProduct(newProd);
        res.status(200).send('se cargo el producto')

    } catch (err) {
        res.status(500).send({ err })
    }
})

//METODO QUE TRAE LA IMAGEN DEL PRODUCTO EN UNA URI, QUE DESPUES USO PARA EL DOM
productsRouterAtlas.get('/image/:productId', async (req, res) => {
    try {
        const product = await productService.getProductByID(req.params.productId);
        //recibo el producto, y verifico que teng imagen
        if (!product || !product.img.data) {
            return res.status(404).send('Imagen no encontrada');
        }
        //utilizo eses set para establecer que tipo de respuesta recibe y indica como el navegador tiene que interpretarlo.
        res.set('Content-Type', product.img.contentType);
        res.send(product.img.data);

    } catch (error) {
        console.log('Error al obtener la imagen:', error);
        res.status(500).send('Ocurrió un error al obtener la imagen');
    }
});

export { productsRouterAtlas };