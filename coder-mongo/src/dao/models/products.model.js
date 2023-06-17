import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    category: String,
    img: {
        data:Buffer, //campo para almacenar datos binarios
        contentType:String //almaceno el timpo de contenido de la img
    },
    status: Boolean
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('products', productSchema); 