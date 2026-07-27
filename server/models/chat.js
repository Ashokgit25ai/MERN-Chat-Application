const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    members: [
        {type: mongoose.Schema.Types.ObjectId, ref: "users"}
    ],
    lastMessage: {
       type: mongoose.Schema.Types.ObjectId, ref: "messages"
    },
    unreadMessagesCount: {
        type: Number,
        default:0
    }
}, {timestamps: true});

module.exports = mongoose.model("Chat",chatSchema);