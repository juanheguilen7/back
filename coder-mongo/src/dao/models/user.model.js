import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: String,
    age: Number,
    img: String
})

export  const UserModel = mongoose.model('session', userSchema);

