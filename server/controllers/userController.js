const router = require("express").Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require('../cloudinary');

router.get("/get-logged-user" , authMiddleware , async (req,res) => {
    try{
        const user = await User.findOne({_id: req.userId});

        res.send({
            message: "User fetched successfull",
            success: true,
            data: user
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
})

router.get("/get-all-users", authMiddleware, async (req,res) => {
    try{
        const userid = req.userId
        const allUsers = await User.find({_id: {$ne: userid}});

        res.send({
            message: "All users data fetched successfully.",
            success: true,
            data: allUsers
        });

    }catch(error){
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
})

router.post('/upload-profile-picture', authMiddleware, async (req, res) => {
    try{
        const image = req.body.image;

        const uploadedImage = await cloudinary.uploader.upload(image, {
            folder: 'convo-hub'
        });

        const user = await User.findByIdAndUpdate(
            {_id: req.userId},
            {profilePic: uploadedImage.secure_url},
            {returnDocument: 'after'}
        );

        res.send({
            message: 'Profile Picture Uploaded Successfully',
            success: true,
            data: user
        });


    }catch(error){
        res.send({
            message: error.message,
            success: false
        })
    }
})



module.exports = router;