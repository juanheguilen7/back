import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        require: true,
        index: true
    },
    age: Number,
    password: String,
})

export const UserModel = mongoose.model('user', userSchema);