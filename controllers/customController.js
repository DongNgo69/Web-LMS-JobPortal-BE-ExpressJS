const asyncHandler = require('express-async-handler');
const {default: slugify} = require('slugify');
const APIFeatures = require('../utils/apiFeatures');
const validateMongoDbId = require('../config/validateMongoDbId');
const createOne = (Model) => {
    return asyncHandler(async (req, res) => {
        try {
            if (req.body.title){
                req.body.slug = slugify(req.body.title.toLowerCase());
            }
            const data = await Model.create(req.body)
            res.status(200).json({
                status: true,
                message: "Tạo thành công"
            })
        } catch(e){
            throw new Error(e)
        }
    })
}
const updateOne = (Model) => {
    return asyncHandler(async (req, res) => {
        const {id} = req.params
        validateMongoDbId(id)
        try {
            if (req.body.title){
                req.body.slug = slugify(req.body.title.toLowerCase());
            }
            const data = await Model.findByIdAndUpdate(
                id,
                req.body,
                {new: true}
            )
            res.status(200).json({
                status: true,
                message: "Sửa thành công"
            })
        } catch(e){
            throw new Error(e)
        }
    })
}
const deleteOne = (Model) => {
    return asyncHandler(async (req, res) => {
        const {id} = req.params
        validateMongoDbId(id)
        try {
            const data = await Model.findByIdAndUpdate(
                id,
                req.body,
                {new: true}
            )
            res.status(200).json({
                status: true,
                message: "Xóa thành công"
            })
        } catch(e){
            throw new Error(e)
        }
    })
}
const getOne = (Model, populateOptions) => {
    return asyncHandler(async (req, res) => {
        const { id, slug } = req.params
        try {
            let query
            if (id) {
                query = Model.findById(id)
            }
            if (slug) {
                query = Model.findOne({slug: slug})
            }
            if (populateOptions) query = query.populate(populateOptions)
            const data = await query
            if (!data){
                throw new Error("Không có dữ liệu thích hợp")
            }
            res.status(200).json({
                status: true,
                message: "Lấy thành công"
            })
        } catch(e){
            throw new Error(e)
        }
    })
}
const getAll = (Model, populateOptions) => {
    return asyncHandler(async (req, res) => {
        try {
            let filter = {}
            let features = new APIFeatures(Model.find(filter), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate()
            let query1
            if (populateOptions){
                query1 = features.query.populate(populateOptions)
            } else {
                query1 = features.query
            }
            const data = await query1;
            res.status(200).json({
                status: true,
                message: "Lấy thành công"
            })
        } catch(e){
            throw new Error(e)
        }
    })
}
module.exports = {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
}