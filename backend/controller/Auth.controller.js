import Client from "../model/client.model.js";
import jwt from "jsonwebtoken";

// This function is for registering a new client
export const register = async ( req , res ) => {
    const { username , email , password } = req.body; // This is what we call destructuring

    try {
        if ( !username || !email || !password ) { // Cheking that is there any empty field so that cleint should fill all the field which is mandate
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await Client.findOne({ email }); // Checking if the client already exists

        if ( existingUser ) { // If exists, then we should throw error that client already exists
            return res.status(400).json({ error: "User already exists!"});
        }

        const hashedPassword = await Client.hashPassword(password); // Hashing the password for security

        const client = new Client({
            username,
            email,
            password: hashedPassword
        }); // created a instance with the data

        await client.save(); // Saving the data

        return res.status(201).json({ message: "User registration successful!" , client: client }); // returning the response
    } catch ( error ) {
        console.log( error );
        return res.status(500).json({ error: error.message }); 
    }
};


// This is for the client who want to log in
export const login = async ( req , res ) => {
    const { email , password } = req.body; // destructuring the data 

    try {
        if ( !email || !password ) { // if any field is empty then checking for it
            return res.status(400).json({ error: "All fields are required" });
        }

        const client = await Client.findOne({ email }); // Finding out that any cleint with this email exists or not 

        if ( !client ) { // If client doesn't exists then returning that no one with this particulat email doesn't exists
            return res.status(400).json({ error: "No client exists with this email!"});
        }

        const isMatch = await client.matchPassword( password ); // checking whether the hashed password inside this database is same when this new input paasowrd is hashed
        if ( !isMatch ) return res.status(400).json({ message: "Invalid credentials"}); // if not then wrong password entered

        const token = jwt.sign({ id: client._id } , process.env.JWT_SECRET , { expiresIn: "0.5h" }); // If all the cases passed successfully, generating an accesstoken for the long time use for any other features reducing the need of login again and again

        res.cookie("token" , token , { httpOnly: true }); // Into the response we are sending attaching cookie object with token key-value pair
        res.status(200).json({ message: "Login Successful!" , token }); // sending back the response 
    } catch ( error ) {
        console.log( error );
        res.status(500).json({ error: error.message }); // If any of the process above fails then error will be sent as response.
    }
}

export const logout = ( req , res ) => {
    try {
        res.clearCookie("token");
        res.status(200).json({message: "Logged Out Successfully!" });
    } catch ( error ) {
        console.log( error );
        return res.status(500).json({ error: error });
    }
}