const VideoCategory = require('../../models/category/videoCategoryModel')
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('../customController')

const postCategory = createOne(VideoCategory)
const updateCategory = updateOne(VideoCategory)
const deleteCategory = deleteOne(VideoCategory)
const getCategory = getOne(VideoCategory)
const getAllCategory = getAll(VideoCategory)
module.exports = {
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
}
