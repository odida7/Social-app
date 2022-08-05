const router = require('express').Router();
const User = require ('../models/User');
const bcrypt = require("bcrypt");


//Register
router.post('/register', async(req, res)=>{

    //generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;

    //new user
    const newUser = new User(req.body);

    //save user
    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(error){
        res.status(500).json(error);
    }
});

//Login
router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    try {
      const user = await User.findOne({email: email})
      if(user){
        const validity = await bcrypt.compare(password, user.password);
        validity ? res.status(200).json(user) : res.status(400).json('Wrong password')
      }else{
        res.status(404).json('user doesnt exists')
      }
    } catch(error){
        res.status(500).json(error)
    }

});


module.exports = router