const CourseCategory = require('../../models/category/courseCategoryModel')
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('../customController')

const postCategory = createOne(CourseCategory)
const updateCategory = updateOne(CourseCategory)
const deleteCategory = deleteOne(CourseCategory)
const getCategory = getOne(CourseCategory)
const getAllCategory = getAll(CourseCategory)

module.exports = {
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
}