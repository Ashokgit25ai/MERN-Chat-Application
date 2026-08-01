const router = require("express").Router();
const Chat = require("../models/chat");
const authMiddleware = require("../middlewares/authMiddleware");
const Message = require("../models/message");
const { trusted } = require("mongoose");


router.post("/new-message", authMiddleware, async (req , res) => {
    try{
        //save the message in the message collection
        const newMessage = await Message(req.body);
        const savedMessage = await newMessage.save();

        //update the last message in the chat collection

        // const currentChat = await Chat.findById(req.body.chatId);
        // currentChat.lastmessage = savedMessage._id
        // await currentChat.save()

        const currentChat = await Chat.findOneAndUpdate({
            _id: req.body.chatId,
        },{
           lastMessage: savedMessage._id,
            $inc: {unreadMessagesCount: 1}
        });

        res.status(201).send({
            success: true,
            message: "Message sent successfully",
            data: savedMessage
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});

router.get("/get-all-messages/:chatId", authMiddleware, async (req , res) => {
    try{
        const chatId = req.params.chatId
        const allMessages = await Message.find({chatId:chatId})
                                      .sort({createdAt: 1});
        res.status(201).send({
            message: "Messages fetches succesfully!",
            success: true,
            data: allMessages
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});

module.exports = router;