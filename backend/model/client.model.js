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

clientSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
    return token;
};

clientSchema.statics.hashPassword = async function ( password ) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    return hashedpassword;
};

clientSchema.methods.matchPassword = async function ( password ) {
    return await bcrypt.compare( password, this.password );
}

const Client = mongoose.model('Client', clientSchema);

export default Client;