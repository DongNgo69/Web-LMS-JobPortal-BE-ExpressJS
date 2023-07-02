const Blog = require('../models/blogModel');
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('./customController')

const postBlog = createOne(Blog)
const updateBlog = updateOne(Blog)
const deleteBlog = deleteOne(Blog)
const getBlog = getOne(Blog)
const getAllBlog = getAll(Blog)
module.exports = {
    postBlog,
    getBlog,
    getAllBlog,
    deleteBlog,
    updateBlog
}