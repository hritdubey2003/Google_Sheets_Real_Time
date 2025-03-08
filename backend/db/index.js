import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// This function is for connecting the MongoDb database to the server using the mongoose package
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;