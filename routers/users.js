const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt =  require('jsonwebtoken');
router.get('/', async (req, res) => {
    const userList = await User.find()
    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList)
})
//Get a single User

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('name email phone ');
    if (!user) {
        res.status(500).json({ message: 'The user with the Given Id is not Found' })
    }
    res.status(200).send(user)
})
router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        //we will ask a user normal Password we will not ask hashpassowrd for user.
        // internally cypt this password.
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();
    if (!user)
        return res.status(400).send('the user cannot be ceated')
    res.send(user)
})
//Login 

router.post('/login', async (req, res) => {
    console.log("Inside the Login Route")
    //login by email
    const secret =process.env.secret
    const user = await User.findOne({ email: req.body.email })

    console.log('>>>', user)
    if (!user) {
        return res.status(400).send('The user not Found')
    }
    console.log('Password is >>>',req.body.password)
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        //To Genrate Json Web Token we can do
        //when the user is Authenticated  
        const token = jwt.sign({
            userId:user.id
        },secret,{
            expiresIn:'1d'
        }
        )
        console.log('user>>>>>>>>>>>>>>>>>>>>>' ,bcrypt.compareSync(req.body.password, user.passwordHash))
        res.status(200).send({user:user.email,token:token})
    }
    else {
        res.status(400).send('Password is wrong')
    }


    // return res.status(200).send(user)
})
module.exports = router;

