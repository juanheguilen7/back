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
        price ? matchQuery.price = price : undefined;

        //estructuro la busqueda 
        const searchProd = await this.model.aggregate([
            {
                //al ser true, alguno de los datos o ambos, filtro por cateogoria o price, sino envio todo los prod
                $match: matchQuery
            },
            {
                //acomoda por precio, asc-desc
                $sort: { price: 1 }
            },
            //filtro para page
            {
                $skip: page
            },
            {
                //limito la cantidad
                $limit: n
            }
        ])

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