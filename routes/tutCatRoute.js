const express = require('express');
const tutorialCatRouter = express.Router();
const { 
    postCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategory
} = require('../controllers/category/tutCatController');
const { 
    isAdmin, 
    authMiddleware,

} = require('../middlewares/authMiddleware');


tutorialCatRouter.get('/', getAllCategory)
tutorialCatRouter.get('/:slug', authMiddleware, isAdmin, getCategory)
tutorialCatRouter.delete('/:id', authMiddleware, isAdmin, deleteCategory)
tutorialCatRouter.put('/:id', authMiddleware, isAdmin, updateCategory)
tutorialCatRouter.post('/', authMiddleware, isAdmin, postCategory)
module.exports = tutorialCatRouter;