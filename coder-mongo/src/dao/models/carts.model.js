import mongoose from "mongoose";


const cartsSchema = new mongoose.Schema({
    //ACOMODO EL SCHEMA PARA QUE FUNCIONE CON POPULATION
    products: [
        {
            idProd: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }
    ]
});


export const CartsModel = mongoose.model('carts', cartsSchema); 