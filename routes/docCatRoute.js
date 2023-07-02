const express = require('express');
const documentCatRouter = express.Router();
const { 
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require('../controllers/category/docCategoryController');
const { 
    isAdmin, 
    authMiddleware,
} = require('../middlewares/authMiddleware');


documentCatRouter.get('/', getAllCategory)
documentCatRouter.get('/:slug', authMiddleware, isAdmin, getCategory)
documentCatRouter.delete('/:id', authMiddleware, isAdmin, deleteCategory)
documentCatRouter.put('/:id', authMiddleware, isAdmin, updateCategory)
documentCatRouter.post('/', authMiddleware, isAdmin, postCategory)

module.exports = documentCatRouter;