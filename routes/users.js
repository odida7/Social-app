const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require ('../models/User');
 

//Get user
router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    try{
      const user = await User.findById(id);

      if(user) {
        const {password, ...otherDetails} = user._doc;

        res.status(200).json(otherDetails);
      }else{
        res.status(404).json('No such user exits')
      }
    }catch(error){
        res.status(500).json(error)
    }
})

//Update user
router.put('/:id', async(req, res)=>{
    const id = req.params.id;
    const {_id, password} = req.body;

    if (id === _id) {
        try {
          if (password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
          }

          const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).json(user);
             
        } catch(error) {
            res.status(500).json(error);
        }
    }else {
        res.status(403).json('Access denied, you can only update your profile');
    }

})

//get all users
router.get('/', async(req, res)=> {
    try{
        let users = await User.find();

        users = users.map((user)=>{
            const {passsword, ...otherDetails} = user._doc
            return otherDetails
        })
        res.status(200).json(users)

    }catch(error){
        res.status(500).json(error)
    }
})

//Delete user
router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    const {currentUserId, currentUserAdminStatus} = req.body;

    if (currentUserId === id || currentUserAdminStatus) {
        try {
           await User.findByIdAndDelete(id);
           res.status(200).json('User deleted successfully');
             
        } catch(error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('Access denied, you can only delete your profile')
    }   
}) 

//Follow user
router.put('/:id/follow', async(req, res)=>{
    const id = req.params.id;
    const {_id} = req.body;

    if (_id === id) {
        res.status(403).json('Action forbidden')
    } else {
        try {
           const followUser = await User.findById(id);
           const followingUser = await User.findById(_id);

           if(!followUser.followers.includes(_id)) {
            await followUser.updateOne({ $push: {followers : _id}});
            await followingUser.updateOne({ $push: {followings : id}});

            res.status(200).json('User followed');
           }else {
            res.status(403).json('User already followed');
            
           }


        } catch (error) {
            res.status(500).json(error)
        }
    }
})

//Unfollow user
router.put('/:id/unfollow', async(req, res)=>{
    const id = req.params.id;
    const {_id} = req.body;

    if (_id === id) {
        res.status(403).json('Action forbidden')
    } else {
        try {
           const followUser = await User.findById(id);
           const followingUser = await User.findById(_id);

           if(followUser.followers.includes(_id)) {
            await followUser.updateOne({ $pull: {followers : _id}});
            await followingUser.updateOne({ $pull: {followings : id}});

            res.status(200).json('User unfollowed');
           }else {
            res.status(403).json('User already unfollowed');
            
           }


        } catch (error) {
            res.status(500).json(error)
        }
    }
})


module.exports = router
