import Client from "../model/client.model.js";

// This function is for registering a new client
export const register = async ( req , res ) => {
    const { username , email , password } = req.body; // This is what we call destructuring

    try {
        if ( !username || !email || !password ) { // Cheking that is there any empty field so that cleint should fill all the field which is mandate
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await users.findOne({ email }); // Checking if the client already exists

        if ( existingUser ) { // If exists, then we should throw error that client already exists
            return res.status(400).json({ error: "User already exists!"});
        }

        const hashedPassword = Client.hashPassword(password); // Hashing the password for security

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

export const login = async ( req , res ) => {
    const { email , password } = req.body;

    try {

    } catch ( error ) {
        console.log( error );
        res.status(500).json({ error: error.message });
    }
}