const router = require('express').Router();
const mongoose = require('mongoose');
const Post = require ('../models/Post');
const User = require('../models/User');

//create post

router.post('/', async(req, res)=>{
    const newPost = new Post(req.body);

    try{
        await newPost.save();
        res.status(200).json(newPost)

    }catch(error){
        res.status(500).json(error)
    } 
})  
 
//get post
router.get('/:id', async(req, res)=>{
    const id = req.params.id;

    try {
       const post = await Post.findById(id);
       res.status(200).json(post);

    }catch (error){
        res.status(500).json(error)
    }
})


//update post
router.put('/:id', async(req, res)=>{
    const postId = req.params.id;
    const {userId} = req.body;

    try{
       const post = await Post.findById(postId);
       if (post.userId === userId) {
        await post.updateOne({$set: req.body});
        res.status(200).json('post updated');
       }else{
        res.status(403).json('Action forbidden')
       }

    }catch (error){
        res.status(500).json(error)
    }

}) 


//like/dislike post
router.put('/:id/like', async(req, res)=>{
    const id = req.params.id;
    const {userId} = req.body;

    try{ 
       const post = await Post.findById(id);
       if (!post.likes.includes(userId)){
        await post.updateOne({$push: { likes: userId }});
        res.status(200).json("Post liked");
       } else {
           await post.updateOne({$pull: { likes: userId }});
           res.status(200).json("Post unliked");
       } 

    }catch(error){
        res.status(500).json(error)
    }

})


//delete post
router.delete('/:id', async(req, res)=> {
    const id = req.params.id;
    const {userId} = req.body;

    try {
        const post = await Post.findById(id);
        if (post.userId === userId) {
        await post.deleteOne();
        res.status(200).json("Post deleted successfully");

    } else {
       res.status(403).json("Action forbidden");
    } 
  } catch (error) {
    res.status(500).json(error);
  }
})

//get timeline post
router.get('/timeline/:id', async(req, res)=>{
   try {
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (error) {
    res.status(500).json(error);
  }

});

//get user's all posts

router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({id: req.params.id});
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  } 
});

module.exports = router
