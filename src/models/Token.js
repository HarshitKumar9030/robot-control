import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    Token: {
        type: String,
        required: true,
        Unique: true,
    },
    Connected: {
        type: Number,
        default: 0,
    },
    battery: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "offline",
    },
    name: {
        type: String,
        default: "Device",
    },
    email: {
        type: String,
        Unique: true,
    }
});

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);