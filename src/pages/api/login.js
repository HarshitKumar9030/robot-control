import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Connect from "@/middleware/mongoose";

const handler = async (req, res) => {
    if(req.method !== "POST")
        return res.status(405).json({ status: "error" , message: "Method not allowed" });
    
    const { email, password } = req.body;

    if(!email && !password)
        return res.status(400).json({status: "error" , message: "Missing fields" });
    
    if(!email.includes("@"))
        return res.status(400).json({status: "error" , message: "Invalid email" });

    // Login user

    let user = await User.findOne({ Email: email });

    if(!user){
        return res.status(400).json({status: "error" , message: "Account Not Found!" });
    }else{
        
        const bytes = CryptoJS.AES.decrypt(user.Password, process.env.ENCRYPTION_SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if(originalPassword !== password){
            return res.status(400).json({status: "error" , message: "Incorrect password" });
        }else{
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "2d" }
            );
            return res.status(200).json({ status: 'success' , message: "User logged in", token: token});
        }
    }

}

export default Connect(handler);