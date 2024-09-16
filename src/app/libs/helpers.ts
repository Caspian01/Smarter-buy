import mongoose from "mongoose";

async function connect(){
    return mongoose.connect(process.env.MONGODB_URL as string)
}