const express = require('express');
const contactRouter = express.Router();
const { 
    createContact,
    getAllContact,
    getAContact,
    deleteContact,
    updateContactStatus
} = require('../controllers/contactController');
const { 
    isAdmin, 
    authMiddleware,

} = require('../middlewares/authMiddleware');


contactRouter.get('/', getAllContact)
contactRouter.post('/', authMiddleware, createContact)
contactRouter.get('/:id', authMiddleware, isAdmin, getAContact)
contactRouter.delete('/:id', authMiddleware, isAdmin, deleteContact)
contactRouter.put('/:id', authMiddleware, isAdmin, updateContactStatus)

module.exports = contactRouter;