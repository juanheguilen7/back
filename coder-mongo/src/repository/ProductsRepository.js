import ProductService from "../dao/service/products.service.js";

class ProductRepository {
    constructor() {
        this.dao = new ProductService();
    }

    async get(n, page, category, price) {
        const prod = await this.dao.getSomeProducts(n, page, category, price);
        return prod
    }
    async getById(id) {
        const prod = await this.dao.getById(id);
        return prod
    }
    async delete(id) {
        const delet = await this.dao.deletProd(id);
        return "eliminado"
    }
    async update(id, key, value) {
        const update = await this.dao.updateProd(id, key, value);
        return update;
    }

    async add(product) {
        const newProd = await this.dao.addProduct(product);
        return newProd;
    }

}

const productRepository = new ProductRepository()

export default productRepository;