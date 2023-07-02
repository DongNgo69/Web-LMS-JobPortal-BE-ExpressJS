const express = require('express');
const videoCatRouter = express.Router();
const { 
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require('../controllers/category/videoCategoryController');
const { 
    isAdmin, 
    authMiddleware,
} = require('../middlewares/authMiddleware');


videoCatRouter.get('/', getAllCategory)
videoCatRouter.get('/:slug', authMiddleware, isAdmin, getCategory)
videoCatRouter.delete('/:id', authMiddleware, isAdmin, deleteCategory)
videoCatRouter.put('/:id', authMiddleware, isAdmin, updateCategory)
videoCatRouter.post('/', authMiddleware, isAdmin, postCategory)

module.exports = videoCatRouter;