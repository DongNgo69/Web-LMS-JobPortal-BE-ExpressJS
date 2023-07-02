const TutorialCategory = require('../../models/category/tutCategoryModel')
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('../customController')

const postCategory = createOne(TutorialCategory)
const updateCategory = updateOne(TutorialCategory)
const deleteCategory = deleteOne(TutorialCategory)
const getCategory = getOne(TutorialCategory)
const getAllCategory = getAll(TutorialCategory)

module.exports = {
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
}