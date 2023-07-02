const express = require('express');
const blogRouter = express.Router();
const { 
    postBlog,
    getBlog,
    getAllBlog,
    deleteBlog,
    updateBlog
} = require('../controllers/blogController');
const { 
    isAdmin, 
    authMiddleware,
} = require('../middlewares/authMiddleware');

blogRouter.get('/', getAllBlog)
blogRouter.get('/:slug', getBlog)
blogRouter.delete('/:id', authMiddleware, isAdmin, deleteBlog)
blogRouter.put('/:id', authMiddleware, isAdmin, updateBlog)
blogRouter.post('/', authMiddleware, isAdmin, postBlog)

module.exports = blogRouter;