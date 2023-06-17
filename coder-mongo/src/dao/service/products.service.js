import { ProductModel } from "../models/products.model.js"

class ProductService {
    constructor() {
        this.model = ProductModel;
    }
    //llamo prods
    async getSomeProducts(n, page, findCategory, price) {

        let matchQuery = {}
        //analizo si son true, los adquiero a el obj, sino es indefinido
        findCategory ? matchQuery.category = findCategory : undefined;
        price ? matchQuery.price = {$gt:price} : undefined;
        matchQuery.status = true;
        //estructuro la busqueda 
        const options = {
            page: page,
            limit: n,
            sort: { price: 1 }
        }
        //paginate recibe primer arg, filtro segundo opciones, recibo toda la informacion y como podemos continuarla
        console.log(matchQuery);
        const searchProd = await this.model.paginate(matchQuery, options)
        return searchProd;
    }
    //agrego prod
    async addProduct(product) {
        //recibo el producto y lo creo
        return await this.model.create(product);

    }
    //llamo prod por id
    async getProductByID(idProd) {
        //busco prod por id
        return await this.model.findOne({ _id: idProd })
    }
    //elimino por id
    async deletProd(idProd) {
        //elimino producto por id
        return await this.model.deleteOne({ _id: idProd });
    }
    //modifico prod
    async updateProd(idProd, key, valor) {
        //traigo el prod
        const prod = await this.getProductByID(idProd);
        //le modifico el atributo
        prod[key] = valor;
        //guardo en DB
        return prod.save();
    }
}



const productService = new ProductService();

export default productService 