const router = require("express").Router();
const Chat = require("../models/chat");
const authMiddleware = require("../middlewares/authMiddleware");
const Message = require("../models/message");
const { trusted } = require("mongoose");


router.post("/new-message", authMiddleware, async (req , res) => {
    try{
        //save the message in the message collection
        const newMessage = await new Message(req.body);
        const savedMessage = await newMessage.save();

        //update the last message in the chat collection

        // const currentChat = await Chat.findById(req.body.chatId);
        // currentChat.lastmessage = savedMessage._id
        // await currentChat.save()

        const currentChat = await Chat.findOneAndUpdate(
            {
                _id: req.body.chatId,
            },{
                $set: {lastMessage: savedMessage._id},
                $inc: {unreadMessagesCount: 1}
            }, 
            {returnDocument: 'after'});

            if (!currentChat){
                return res.status(404).send({
                    success: false,
                    message: "Chat not found!"
                });
            }

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
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 30;
        
        const skip = (page - 1) * limit;

        const allMessages = await Message.find({chatId})
                                      .sort({createdAt: -1})
                                      .skip(skip)
                                      .limit(limit);
        res.status(200).send({
            message: "Messages fetches succesfully!",
            success: true,
            data: allMessages.reverse()
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});

module.exports = router;

