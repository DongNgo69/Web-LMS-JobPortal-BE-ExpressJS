const DocumentCategory = require('../../models/category/docCategoryModel')
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('../customController')

const postCategory = createOne(DocumentCategory)
const updateCategory = updateOne(DocumentCategory)
const deleteCategory = deleteOne(DocumentCategory)
const getCategory = getOne(DocumentCategory)
const getAllCategory = getAll(DocumentCategory)

module.exports = {
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
}
