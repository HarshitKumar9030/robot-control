import mongoose from "mongoose";

const Connect = handler => async (req, res)=>{
    if(mongoose.connections[0].readystate){
    return handler(req, res)
} 
    await mongoose.connect(process.env.MONGO_URI)
    return handler(req, res)
}

export default Connect;