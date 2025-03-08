import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = ( req , res , next ) => {
    const token = req.cookies.token;

    if ( !token ) return res.status(400).json({ message: "Unauthorized!"});

    try {
        const verified = jwt.verify( token , process.env.JWT_SECRET );

        req.client = verified;
        next();
    } catch ( error ) {
        res.clearCookie("token");
        console.log( error );
        res.status(401).json({ message: "Invalid Token!" });
    }
}