const express = require('express');
const reviewRouter = express.Router();
const { 
    createReview,
    getAllReview,
    getAReview,
    deleteReview,
    updateReviewStatus
} = require('../controllers/reviewController');
const { 
    isAdmin, 
    authMiddleware,

} = require('../middlewares/authMiddleware');


reviewRouter.get('/', getAllReview)
reviewRouter.post('/', authMiddleware, createReview)
reviewRouter.get('/:id', authMiddleware, isAdmin, getAReview)
reviewRouter.delete('/:id', authMiddleware, isAdmin, deleteReview)
reviewRouter.put('/:id', authMiddleware, isAdmin, updateReviewStatus)

module.exports = reviewRouter;