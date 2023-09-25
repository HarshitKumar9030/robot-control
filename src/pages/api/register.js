import User from "@/models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import Connect from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ status: "error" , message: "Method not allowed" });

  const { name, email, password } = req.body;

  if (!name && !email && !password)
    return res.status(400).json({status: "error" , message: "Missing fields" });
  if (password.length < 8)
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  if (!email.includes("@"))
    return res.status(400).json({status: "error" , message: "Invalid email" });

  // Check if user exists
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({status: "error" , message: "User already exists" });
  }else {
    // Create user
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
    );


    user = new User({
      Name: name,
      Email: email,
      Password: CryptoJS.AES.encrypt(
        password,
        process.env.ENCRYPTION_SECRET
      ).toString(),
    });
    await user.save();



    return res.status(200).json({ status: 'success' , message: "User created", token: token});
  }
}
export default Connect(handler);