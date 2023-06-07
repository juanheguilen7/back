import mongoose from "mongoose";


const cartsSchema = new mongoose.Schema({
    idProd: String,
    quantity: Number
});


export const CartsModel = mongoose.model('carts', cartsSchema); 