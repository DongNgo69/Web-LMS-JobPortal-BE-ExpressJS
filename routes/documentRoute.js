const express = require('express');
const documentRouter = express.Router();
const { 
    createDocument,
    getAllDocument,
    getADocument,
    deleteDocument,
    updateDocument
} = require('../controllers/documentController');
const { 
    isAdmin, 
    authMiddleware,
} = require('../middlewares/authMiddleware');

documentRouter.get('/', getAllDocument)
documentRouter.get('/:slug', authMiddleware, getADocument)
documentRouter.delete('/:id', authMiddleware, isAdmin, deleteDocument)
documentRouter.put('/:id', authMiddleware, isAdmin, updateDocument)
documentRouter.post('/', authMiddleware, isAdmin, createDocument)

module.exports = documentRouter;