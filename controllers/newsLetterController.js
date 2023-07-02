const NewsLetter = require("../models/newsLetterModel");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../config/validateMongoDbId');

const subscribe = asyncHandler(async (req, res) => {
    try {
        const newEmail = await NewsLetter.create(req.body)
        res.status(200).json({
            status: true,
            message: "Đã đăng ký để nhận tin tức mới"
        })
    } catch (e){
        throw new Error(e);
    }
})

const unsubscribe = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const newEmail = await NewsLetter.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Đã  hủy đăng ký"
        })
    } catch (e){
        throw new Error(e);
    }
})





module.exports = {
    subscribe,
    unsubscribe, 
    // getATutCategory,
    // deleteTutCategory,
    // updateTutCategory
}