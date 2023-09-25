import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Connect from "@/middleware/mongoose";

const handler = async (req, res) => {
    if(req.method !== "POST")
        return res.status(405).json({ state: "error" , message: "Method not allowed" });
    
    const { token } = req.body;

    if(!token)
        return res.status(400).json({state: "error" , message: "Missing fields" });

    // Decode token and give email and password

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findOne({ _id: decoded.id });

    if(!user){
        return res.status(400).json({state: "error" , message: "Account Not Found!" });
    }else{
        return res.status(200).json({ state: 'success' , id: user._id});
    }

}

export default Connect(handler);