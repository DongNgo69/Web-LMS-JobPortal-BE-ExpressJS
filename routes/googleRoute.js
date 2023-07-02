const express = require('express');
const googleRouter = express.Router();
const {generateToken} = require('../config/jwtToken')
const User = require('../models/userModel');
const AsyncHandler = require('express-async-handler');
const passport = require('passport')
googleRouter.get(
    '/login/success', 
    AsyncHandler(async (req, res) => {
        if (req.user){
            const findUser = await User.findOne( {email: req.user.email})
            if (findUser) {
                res.status(200).json({
                    status: true,
                    message: "Đăng nhập thành công!",
                    token: generateToken(findUser?._id),
                    role: findUser?.roles,
                    username: findUser?.name,
                    user_image: findUser?.user_image,
                    from: "google"
                })
            }
        } else {
            throw new Error("Somgthing Went Wrong!")
        }
    }
));

googleRouter.get(
    '/login/failed', 
    AsyncHandler(async (req, res) => {
        res.status(401).json({
            status: false,
            message: "Đăng nhập thất bại!",  
        })
    }
));
googleRouter.get(
    '/google',passport.authenticate('google', ["profile", "email"]) 
);
googleRouter.get(
    '/auth/google/callback', 
     passport.authenticate('google', {
            successRedirect: '/login/success',
            failureRedirect: '/login/failed',
        })
);
googleRouter.get(
    '/logout', 
    AsyncHandler(async (req, res) => {
        req.logout();
        res.redirect('/') 
    }
));

module.exports = googleRouter;