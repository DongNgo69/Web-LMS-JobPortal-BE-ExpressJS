const express = require('express');
const workRouter = express.Router();
const { 
    postDetails,
    getDetails,
    getAllDetails,
    deleteDetails,
    updateDetails
} = require('../controllers/workController');
const { 
    isBoth, 
    authMiddleware,
    isAdmin
} = require('../middlewares/authMiddleware');

workRouter.get('/', authMiddleware, isAdmin, getAllDetails)
workRouter.get('/:id', authMiddleware, isAdmin, getDetails)
workRouter.delete('/:id', authMiddleware, isAdmin, deleteDetails)
workRouter.put('/:id', authMiddleware, isAdmin, updateDetails)
workRouter.post('/', postDetails)

module.exports = workRouter;