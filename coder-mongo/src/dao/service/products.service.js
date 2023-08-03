import ProductRepository from "../../repository/ProductsRepository.js";

class ProductService {
    constructor() {
        this.repository = new ProductRepository();
    }

    async getSomeProducts(n, page, findCategory, price) {
        return await this.repository.getSomeProducts(n, page, findCategory, price);
    }

    async addProduct(product) {
        return await this.repository.addProduct(product);
    }

    async getProductByID(productId) {
        return await this.repository.getProductById(productId);
    }

    async deleteProduct(productId) {
        return await this.repository.deleteProduct(productId);
    }

    async updateProduct(productId, key, value) {
        return await this.repository.updateProduct(productId, key, value);
    }
}

const productService = new ProductService();
export default productService;