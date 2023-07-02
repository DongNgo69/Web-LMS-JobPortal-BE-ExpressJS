const Tutorial = require('../models/tutorialModel');
const asyncHandler = require('express-async-handler');
const {default: slugify} = require('slugify');
const validateMongoDbId = require('../config/validateMongoDbId');

const postTutorial = asyncHandler(async (req, res) => {
    try {
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        if (req.body.tutorialCategory){
            req.body.tutorialCategorySlug = slugify(
                req.body.tutorialCategory.toLowerCase()
            );
        }
        const postTutorial = await Tutorial.create(req.body);
        res.status(200).json({
            status: true,
            message: "Tạo Tutorial thành công",
        });
    } catch (e){
        throw new Error(e);
    }
})
const getAllTutorial = asyncHandler(async (req, res) => {
    try {
        const allTutCat = await Tutorial.find();
        res.status(200).json({
            status: true,
            message: "Lấy danh sách Tutorial thành công",
            allTutCat,
        })
    }catch (e){
        throw new Error(e);
    }
})
const getATutorial = asyncHandler(async (req, res) => {
    const {slug, type} = req.params;
    try {
        const findTutorial = await Tutorial.findOne({
            slug: slug,
            tutorialCategorySlug: type,
        });
        const tutorialTopics = await Tutorial
        .find({tutorialCategorySlug: type})
        .select("topicName title slug tutorialCategorySlug")
        .sort("createdAt")
        res.status(200).json({
            status: true,
            message: "Lấy Tutorial thành công",
            findTutorial,
            tutorialTopics
        })
    }catch (e){
        throw new Error(e);
    }
})
const updateTutorial = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        if (req.body.tutorialCategory){
            req.body.tutorialCategorySlug = slugify(
                req.body.tutorialCategory.toLowerCase()
            );
        }
        const updateTut = await Tutorial.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        )
        res.status(200).json({
            status: true,
            message: "Sửa Tutorial thành công",
            updateTut,
        })
    }catch (e){
        throw new Error(e);
    }
})
const deleteTutorial = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const findTutCat = await Tutorial.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Xóa Tutorial thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})
module.exports = {
    postTutorial,
    getAllTutorial,
    getATutorial,
    updateTutorial,
    deleteTutorial
}