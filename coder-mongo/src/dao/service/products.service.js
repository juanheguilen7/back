import { ProductModel } from "../models/products.model.js"
import ProductDTO from "../../dto/products.dto.js";

class ProductService {
    constructor() {
        this.model = ProductModel;
    }
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
        const searchProd = await this.model.paginate(matchQuery, options)
        return searchProd;
    }
    //agrego prod
    async addProduct(product) {
        //recibo el producto y lo creo
        const newProduct = new ProductDTO(product); //uso dto
        return await this.model.create(newProduct);

    }

    //llamo prod por id
    async getProductByID(idProd) {
        return await this.model.findOne({ _id: idProd })
    }

    //elimino por id
    async deletProd(idProd) {
        return await this.model.deleteOne({ _id: idProd });
    }
    //modifico prod
    async updateProd(idProd, key, valor) {
        const prod = await this.getProductByID(idProd);
        //le modifico el atributo
        prod[key] = valor;
        return prod.save();
    }
}



const productService = new ProductService();

export default productService 