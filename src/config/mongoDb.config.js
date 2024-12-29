import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const mongoURI = process.env.MONGO_URI;

export const connectToMongoDb = async () => { 
    try {
         await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         })
        console.log("MongoDB connected");
    } catch (error) { 
        console.log("Error conecting to MongoDB", error);
        throw error; // se envia error si la conexión falla
    }};