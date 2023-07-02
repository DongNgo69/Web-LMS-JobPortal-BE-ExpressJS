const BlogCategory = require('../../models/category/blogCategoryModel')
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('../customController')

const postCategory = createOne(BlogCategory)
const updateCategory = updateOne(BlogCategory)
const deleteCategory = deleteOne(BlogCategory)
const getCategory = getOne(BlogCategory)
const getAllCategory = getAll(BlogCategory)

module.exports = {
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
}
