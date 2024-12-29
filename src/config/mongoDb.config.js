import mongoose from "mongoose";

export const connectToMongoDb = async () => { 
    try {
        mongoose.connect("mongodb+srv://massevillalba:Cersei2024!@clustervillalba.cocqh.mongodb.net/clase-15")
        console.log("MongoDB connected");
    } catch (error) { 
        console.log(error);
    }};