export default class ProductDTO {
    constructor({ title, description, price, code, stock, category, img, status }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.category = category;
        this.img = img;
        this.status = status;

    }
}