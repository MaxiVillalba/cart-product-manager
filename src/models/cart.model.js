import mongoose, { Schema } from "mongoose";

const cartCollection = "cart";

const cartchema = new Schema({ 
    products: { type: Array, default: [] },



});

export const cartModel = mongoose.model(cartCollection, cartchema);