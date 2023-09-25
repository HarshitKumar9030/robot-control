import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Token from "@/models/Token";
import Connect from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ status: "error", message: "Method not allowed" });

  const { jwtToken } = req.body;

  if (!jwtToken)
    return res.status(400).json({ status: "error", message: "Missing fields" });

  // Decode token and give email and password

  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

  let user = await User.findOne({ _id: decoded.id });

  if (!user) {
    return res
      .status(400)
      .json({ status: "error", message: "Account Not Found!" });
  } else {
    // Create Auth Token
    //find if token exists
    const AuthToken = jwt.sign(
      { id: user._id, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    let a = await Token.find();


    for(let i = 0; i < a.length; i++) {
      if(a[i].Token != AuthToken) {
        //decoding 
        const decoded = jwt.verify(a[i].Token, process.env.JWT_SECRET);
        if(decoded.email == user.Email) {
            return res.status(200).json({ status: "success", token: a[i].Token });
        }
      }
    }

    if (a.length === 0) {
    let atoken = new Token({
      Token: AuthToken,
    });
    await atoken.save();
    }

    return res.status(200).json({ status: "success", token: AuthToken });
  }
};

export default Connect(handler);
