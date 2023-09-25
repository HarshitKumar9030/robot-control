import mongoose from "mongoose";
import Connect from "@/middleware/mongoose";
import Token from "@/models/Token";
import User from "@/models/User";
import jwt from "jsonwebtoken";


const handler = async (req, res) => {

    if(req.method != "POST")
        return res.status(405).json({ state: "error" , message: "Method not allowed" });

        if(!req.query.token)
            return res.status(400).json({state: "error" , message: "Authentication Required" });
    
        const token = req.query.token;

        //decode
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        
        let user = await User.findOne({ _id: userId });

        let verify = await Token.findOne({email: user.Email});

        let tokenData = await verify;

        if(!tokenData){
            return res.status(400).json({state: "error" , message: "Device not found" });
        }else{
            return res.status(200).json({state: "success" , message: "Device found", data: tokenData});
        }




       
}

export default Connect(handler);