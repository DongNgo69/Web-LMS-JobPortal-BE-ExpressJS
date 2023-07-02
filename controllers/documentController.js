const Document = require("../models/documentModel");
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../config/validateMongoDbId');
const {default: slugify} = require('slugify');
const createDocument = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try{
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        const document = await Document.create(req.body)
        res.status(200).json({
            status: true,
            message: "Đăng document thành công"
        })
    } catch(e){
        throw new Error(e)
    }
})
const getAllDocument = asyncHandler(async (req, res) => {
    try {
        const alldocument = await Document.find();
        res.status(200).json({
            status: true,
            message: "Lấy danh sách document thành công",
            alldocument,
        })
    }catch (e){
        throw new Error(e);
    }
})
const getADocument = asyncHandler(async (req, res) => {
    const {slug} = req.params;
    try {
        const finddocument = await Document.findOne({slug: slug});
        res.status(200).json({
            status: true,
            message: "Lấy document thành công",
            finddocument,
        })
    }catch (e){
        throw new Error(e);
    }
})
const deleteDocument = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const finddocument = await Document.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Xóa document thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})
const updateDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try{
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        const document = await Document.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )
        res.status(200).json({
            status: true,
            message: "Cập nhật document thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})

module.exports = {
    createDocument,
    getAllDocument,
    getADocument,
    deleteDocument,
    updateDocument
}