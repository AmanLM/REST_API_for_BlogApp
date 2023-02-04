const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

//Creating New Post
router.post('/',async(req,res)=>{
    const newPost = new Post(req.body);

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', async(req,res)=>{
    try{
        const post = Post.findById(req.params.id);
        if(req.body.username === post.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set : new body
                },{
                    new : true
                })
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You cannot update others post");
        }
        
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const post = Post.findById(req.params.id);
        if(req.body.username === post.username){
            try {
                await (await post).delete();
                res.status(200).json("Post has been deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You cannot delete others post");
        }
        
    }
    catch(err){
        res.status(500).json(err);
    }
})
//Get post BY id
router.get('/:id',async(req,res)=>{
    try{
        const posts = await Post.findById(req.params.id);
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Get all posts
//GET ALL POSTS

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
          //fetch posts with username
        posts = await Post.find({ username });
      }
      else if (catName) {
        // fetch posts with category
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      }
      else {
          //Will fetch all posts
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;