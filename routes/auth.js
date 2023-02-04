const express = require('express');
const User = require('../models/user');
const router = express.Router();
// const user = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register',async(req,res)=>{
    
    try{
        const salt = await bcrypt.genSalt(5);
        const decrypted = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : decrypted,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})

router.post('/login',async(req,res)=>{
    try{
        const user = await User.findOne({username : req.body.username});
        if(!user){
            return res.status(400).json("User does not exist");
        }

        const validate = await bcrypt.compare(req.body.password,user.password);
        if(!validate){
            return res.status(400).json("Wrong Password");
        }
        // res.status(200).json(user);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;