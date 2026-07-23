const router = require("express").Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const User = require("../models/user");


router.post("/signup", async (req,res) => {
    try{

        //if user already exists 
        const user = await User.findOne({email: req.body.email});
        

        //if user does not exists, send error message
        if(user){
            return res.status(400).send({
                message: 'User already exist.',
                success: false
            });
        }
        
        //encrypt the password
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        //create new user, save in DB
        const newUser = await new User(req.body);
        await newUser.save();

        res.status(201).send({
            message: 'User created successfully!',
            success: true
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});

router.post("/login", async (req,res) => {
    try{

        //check if user is exists
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).send({
                message:"User doesn't exist.",
                success: false
            });
        }
        //check if the password is correct or not
        const isValid = await bcrypt.compare(req.body.password , user.password);
        if(!isValid){
            return res.status(400).send({
                message:'Password incorrect',
                success: false
            });
        }
        //check the password is match, if match create jwt token 
        const token = await jwt.sign({userId: user._id},process.env.SECRET_KEY,{expiresIn: "1d"});

        res.send({
            message: "Login successfull",
            success: true,
            token
        })

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
});

module.exports = router;