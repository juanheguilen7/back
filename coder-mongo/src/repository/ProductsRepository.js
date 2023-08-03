import ProductRepositoryInterface from "./ProductsRepositoryInterface.js";
import { ProductModel } from "../dao/models/products.model.js";
import ProductDTO from "../dto/products.dto.js";

export default class ProductRepository extends ProductRepositoryInterface {
    async getSomeProducts(n, page, findCategory, price) {
        let matchQuery = {};
        findCategory ? (matchQuery.category = findCategory) : undefined;
        price ? (matchQuery.price = { $gt: price }) : undefined;
        matchQuery.status = true;

        const options = {
            page: page,
            limit: n,
            sort: { price: 1 }
        };

        return await ProductModel.paginate(matchQuery, options);
    }

    async addProduct(product) {
        const newProduct = new ProductDTO(product);
        return await ProductModel.create(newProduct);
    }

    async getProductById(productId) {
        return await ProductModel.findOne({ _id: productId });
    }

    async deleteProduct(productId) {
        return await ProductModel.deleteOne({ _id: productId });
    }

    async updateProduct(productId, key, value) {
        const product = await this.getProductById(productId);
        product[key] = value;
        return product.save();
    }
}