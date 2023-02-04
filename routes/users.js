const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const Post = require('../models/post');

//Updates user
router.put('/:id',async(req,res)=>{
    if(req.body.userId==req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body,
                },
                { new: true }
              );
            res.status(200).json(updatedUser);            
        }catch(err){
            res.status(500).json(err);     
        }
    }
    else{
        res.status(401).json("Not able to update another user account");
    }
})

router.delete('/:id',async(req,res)=>{
    if (req.body.userId === req.params.id) {//check if user is same to delete
        try {
          const user = await User.findById(req.params.id);//Find user
          try {
            await Post.deleteMany({ username: user.username });//deletes posts too for that user
            await User.findByIdAndDelete(req.params.id);//Deletes user
            res.status(200).json("User has been deleted!");
          } catch (err) {
            res.status(500).json(err);
          }
        } catch (err) {
          res.status(404).json("User does not found!");
        }
      } else {
        res.status(401).json("You cannot delete others account!");
      }
})


router.get('/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        // res.status(200).json(user);
        const {password, ...others } = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;