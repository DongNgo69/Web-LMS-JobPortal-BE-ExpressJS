const express = require('express');
const courseCatRouter = express.Router();
const { 
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require('../controllers/category/courseCategoryController');
const { 
    restrictTo,
    authMiddleware,
} = require('../middlewares/authMiddleware');


courseCatRouter.get('/', getAllCategory)
courseCatRouter.get('/:slug', authMiddleware, restrictTo("admin", "instructor"), getCategory)
courseCatRouter.delete('/:id', authMiddleware, restrictTo("admin", "instructor"), deleteCategory)
courseCatRouter.put('/:id', authMiddleware, restrictTo("admin", "instructor"), updateCategory)
courseCatRouter.post('/', authMiddleware, restrictTo("admin", "instructor"), postCategory)

module.exports = courseCatRouter;