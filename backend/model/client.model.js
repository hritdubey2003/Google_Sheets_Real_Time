import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const clientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true  
    }
} , { timestamps: true });

clientSchema.method.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

clientSchema.static.hashPassword = async function ( password ) {
    const hashedpassword = await bcrypt.hash(password, 10);
    return hashedpassword;
};

const Client = mongoose.model('Client', clientSchema);

export default Client;