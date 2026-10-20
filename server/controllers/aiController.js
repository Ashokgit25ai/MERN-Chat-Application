const ollama = require("ollama").default;
const router = require("express").Router();

const authMiddleware = require("../middlewares/authMiddleware");
const AIConversation = require("../models/aiConveresation");


router.post("/chat", authMiddleware, async (req, res) => {
    try{
        const { message } = req.body;

        if(!message || !Array.isArray(message)){
            return res.status(400).json({
                success: false,
                message: "Message is required!"
            });
        }
        const response = await ollama.chat({
            model: "qwen3:1.7b",
            messages: message
        });

        res.status(200).json({
            success: true,
            message: response.message.content
        });
    }catch(error){
        console.error("Ollama error: ", error);

        res.status(500).json({
            success: false,
            message: "AI service failed"
        });
    }
});

module.exports = router;