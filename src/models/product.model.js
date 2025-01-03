import mongoose, { Schema } from "mongoose";

const productsCollection = "products";

const productSchema = new Schema({ 
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, default: true },
    category: { type: String, required: true }, 
});

export const productModel = mongoose.model(productsCollection, productSchema);