const express = require('express');
const blogCatRouter = express.Router();
const { 
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require('../controllers/category/blogCategoryController');
const { 
    restrictTo, 
    authMiddleware,
} = require('../middlewares/authMiddleware');


blogCatRouter.get('/', getAllCategory)
blogCatRouter.get('/:slug', authMiddleware, restrictTo("admin"), getCategory)
blogCatRouter.delete('/:id', authMiddleware, restrictTo("admin"), deleteCategory)
blogCatRouter.put('/:id', authMiddleware, restrictTo("admin"), updateCategory)
blogCatRouter.post('/', authMiddleware, restrictTo("admin"), postCategory)

module.exports = blogCatRouter;