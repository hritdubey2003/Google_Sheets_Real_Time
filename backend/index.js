import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import router from "./route/Auth.route.js";

dotenv.config();
const app = express();

app.use( cors() );
app.use( express.json() );
app.use( cookieParser() );

app.get("/" , ( req , res ) => {
    res.send("Backend Server is Healthy!");
})

const port = process.env.PORT || 5000;
app.listen( port , () => {
    console.log(`Server is running on port ${port}`);
});

connectDB();

app.use("/auth" , router);