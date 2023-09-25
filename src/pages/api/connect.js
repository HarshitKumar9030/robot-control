import mongoose from "mongoose";
import Connect from "@/middleware/mongoose";
import Token from "@/models/Token";
import jwt from "jsonwebtoken";
import User from "@/models/User";


const handler = async (req, res) => {

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    if(req.method != "POST")
    
        return res.status(405).json({ state: "error" , message: "Method not allowed" });

        if(!req.query.auth)
            return res.status(400).json({state: "error" , message: "Authentication Required" });
    
        const token = req.query.auth;
        const { name, battery, status } = req.body;

        let a = await Token.find({ Token: token });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        if(a.length === 0)
            return res.status(400).json({state: "error" , message: "No Token Found" });
        else {
                let add = Token.findOneAndUpdate({ Token: token }, {email: decoded.email, name: name,  battery: battery, status: status, Connected: 1 })
                await add;
            return res.status(200).json({ state: 'success' , message: "Authenticated"});
        }

        

        
}

export default Connect(handler);