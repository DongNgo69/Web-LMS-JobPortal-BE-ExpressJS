const express = require('express');
const newsLetterRouter = express.Router();
const { 
    subscribe,
    unsubscribe,
    // getATutCategory,
    // deleteTutCategory,
    // updateTutCategory 
} = require('../controllers/newsLetterController');
const { 
    isAdmin, 
    authMiddleware,

} = require('../middlewares/authMiddleware');

newsLetterRouter.post('/', subscribe)
newsLetterRouter.delete('/:id', unsubscribe)

module.exports = newsLetterRouter;