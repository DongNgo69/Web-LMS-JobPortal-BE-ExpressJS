const express = require('express');
const tutorialRouter = express.Router();
const { 
    postTutorial,
    getATutorial,
    updateTutorial,
    deleteTutorial,
    getAllTutorial
} = require('../controllers/tutorialController');
const { 
    isAdmin, 
    authMiddleware,

} = require('../middlewares/authMiddleware');


tutorialRouter.get('/', getAllTutorial)
tutorialRouter.get('/:type/:slug', getATutorial)
tutorialRouter.delete('/:id', authMiddleware, isAdmin, deleteTutorial)
tutorialRouter.put('/:id', authMiddleware, isAdmin, updateTutorial)
tutorialRouter.post('/', authMiddleware, isAdmin, postTutorial)
module.exports = tutorialRouter;