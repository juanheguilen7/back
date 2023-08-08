import { ProductModel } from "../models/products.model.js"
import ProductDTO from "../../dto/products.dto.js"

export default class ProductService {
    //llamo prods
    async getSomeProducts(n, page, findCategory, price) {

        let matchQuery = {}
        //analizo si son true, los adquiero a el obj, sino es indefinido
        findCategory ? matchQuery.category = findCategory : undefined;
        price ? matchQuery.price = { $gt: price } : undefined;
        matchQuery.status = true;
        //estructuro la busqueda 
        const options = {
            page: page,
            limit: n,
            sort: { price: 1 }
        }
        //paginate recibe primer arg, filtro segundo opciones, recibo toda la informacion y como podemos continuarla
        console.log(matchQuery);
        const searchProd = await ProductModel.paginate(matchQuery, options)
        return searchProd;
    }
    //agrego prod
    async addProduct(product) {
        //recibo el producto y lo creo
        const newProduct = new ProductDTO(product); //uso dto
        return await ProductModel.create(newProduct);

    }

    //llamo prod por id
    async getProductByID(idProd) {
        //busco prod por id
        return await ProductModel.findOne({ _id: idProd })
    }

    //elimino por id
    async deletProd(idProd) {
        //elimino producto por id
        return await ProductModel.deleteOne({ _id: idProd });
    }
    //modifico prod
    async updateProd(idProd, key, valor) {
        //traigo el prod
        const prod = await ProductModel.getProductByID(idProd);
        //le modifico el atributo
        prod[key] = valor;
        //guardo en DB
        return prod.save();
    }
}