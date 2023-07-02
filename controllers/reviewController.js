const Review = require("../models/reviewModel");
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../config/validateMongoDbId');

const createReview = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try{
        let data = {user: _id, comment: req.body.comment, color: req.body.color};
        const review = await Review.create(data)
        res.status(200).json({
            status: true,
            message: "Đăng review thành công"
        })
    } catch(e){
        throw new Error(e)
    }
})
const getAllReview = asyncHandler(async (req, res) => {
    try {
        const allReview = await Review.find().populate('user');
        res.status(200).json({
            status: true,
            message: "Lấy danh sách Review thành công",
            allReview,
        })
    }catch (e){
        throw new Error(e);
    }
})
const getAReview = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const findReview = await Review.findById(id).populate('user');
        res.status(200).json({
            status: true,
            message: "Lấy Review thành công",
            findReview,
        })
    }catch (e){
        throw new Error(e);
    }
})
const deleteReview = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const findReview = await Review.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Xóa Review thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})
const updateReviewStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try{
        const review = await Review.findByIdAndUpdate(
            id,
            {isApproved: req.body.isApproved},
            {new:true}
        )
        res.status(200).json({
            status: true,
            message: "Cập nhật trạng thái review thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})

module.exports = {
    createReview,
    getAllReview,
    getAReview,
    deleteReview,
    updateReviewStatus
}