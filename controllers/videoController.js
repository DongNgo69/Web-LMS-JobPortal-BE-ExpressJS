const Video = require('../models/videoModel');
const asyncHandler = require('express-async-handler');
const {default: slugify} = require('slugify');
const validateMongoDbId = require('../config/validateMongoDbId');

const postVideo = asyncHandler(async (req, res) => {
    try{
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        const video = await Video.create(req.body)
        res.status(200).json({
            status: true,
            message: "Đăng Video thành công",
        });
    } catch (e){
        throw new Error(e);
    }
})
const getVideo = asyncHandler(async (req, res) => {
    const {slug} = req.params;
    try{
        const video = await Video.findOne({slug:slug});
        res.status(200).json({
            status: true,
            message: "Lấy Video thành công",
            video
        });
    }catch (e){
        throw new Error(e);
    }
})
const getAllVideo = asyncHandler(async (req, res) => {
    try{
        const video = await Video.find();
        res.status(200).json({
            status: true,
            message: "Lấy danh sách Video thành công",
            video
        });
    }catch (e){
        throw new Error(e);
    }
})
const deleteVideo = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const video = await Video.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Xóa Video thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})
const updateVideo = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        const video = await Video.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        res.status(200).json({
            status: true,
            message: "Sửa Vieo thành công",
            video,
        })
    }catch (e){
        throw new Error(e);
    }
})
module.exports = {
    postVideo,
    getVideo,
    getAllVideo,
    deleteVideo,
    updateVideo
}