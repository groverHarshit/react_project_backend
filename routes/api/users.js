const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

/*
    * @route /api/users
    * @desc test route
    * @access public
*/

router.get('/', (req, res) => res.status(200).json({ success: true, message: "Hello World" }));

/*
    * @route /api/users/register
    * @desc Register a user
    * @access public
*/

router.post('/register', async (req, res) => {
    try {
        User.findOne({
            email: req.body.email,
        }).then(user => {
            if (user) return res.status(400).json({ success: false, message: `User already exists` });

            const avatar = gravatar(req.body.email, {
                s: "200",
                r: 'pg',
                d: 'mm',
            })

            const new_user = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(new_user.password, salt, (err, hash) => {
                    if (err) throw err;
                    new_user.password = hash;
                    new_user.save().then(user => {
                        console.log(user);
                        return res.status(200).json({
                            success: true,
                            message: `User registered!`,
                            user,
                        })
                    }).catch(err => console.log(err))
                });
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error!`,
        })
    }
});


module.exports = router;