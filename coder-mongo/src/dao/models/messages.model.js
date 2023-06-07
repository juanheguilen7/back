import mongoose from "mongoose";

//el email va a ser unico pero no el alias.
const messagesSchema = new mongoose.Schema({
    user: {
        type: String
    },
    message: [],
    email: {
        type: String,
        unique:true
    }
});

export const MessagesModel = mongoose.model('messages', messagesSchema); 