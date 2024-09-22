const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.vectorstock.com/i/1000x1000/36/15/businessman-character-avatar-isolated-vector-12613615.webp",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
    },
],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books",
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order",
        },
    ],
},
{timestamps: true}
);
module.exports = mongoose.model("user",user);
