const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const { getToken } = require('../utils/helpers')

//this post router will to register new user.
router.post('/register', async (req, res) => {
    //my req.body will constain all the user information { email, password, firstName, lastName, username }
    const { email, password, firstName, lastName, username } = req.body;

    //now we check if this user is already registered with this email or not.
    const user = await User.findOne({ email: email });

    if (user) {
        return res.status(403).json({ error: "A user with this email already exists." });
    }

    //if this is a valid user then create a new user;
    // first encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = { email, password: hashedPassword, firstName, lastName, username };
    const newUser = await User.create(newUserData);



    const token = await getToken(email, newUser);

    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(403).json({ err: "invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    //PASSWORD VALIDATION
    if (!isPasswordValid) {
        return res.status(403).json({ err: "invalid credentials" });
    }

    const token = await getToken(user.email, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})

module.exports = router;