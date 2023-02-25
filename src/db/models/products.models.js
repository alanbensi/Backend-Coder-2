import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {type: Number, unique:true},
    stock: Number,
});

export default productsSchema;