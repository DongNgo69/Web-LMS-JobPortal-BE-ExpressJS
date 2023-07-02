const express = require('express');
const projectCatRouter = express.Router();
const { 
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require('../controllers/category/projCategoryController');
const { 
    restrictTo, 
    authMiddleware,
} = require('../middlewares/authMiddleware');


projectCatRouter.get('/', getAllCategory)
projectCatRouter.get('/:slug', authMiddleware, restrictTo("admin"), getCategory)
projectCatRouter.delete('/:id', authMiddleware, restrictTo("admin"), deleteCategory)
projectCatRouter.put('/:id', authMiddleware, restrictTo("admin"), updateCategory)
projectCatRouter.post('/', authMiddleware, restrictTo("admin"), postCategory)

module.exports = projectCatRouter;