const express = require('express');
const sessionRouter = express.Router();
const { 
    postSession,
    updateSession,
    deleteSession,
    getSession,
    getAllSession
} = require('../controllers/bookSessionController');
const { 
    restrictTo, 
    authMiddleware,
} = require('../middlewares/authMiddleware');


sessionRouter.get('/', getAllSession)
sessionRouter.get('/:id', restrictTo("admin"), getSession)
sessionRouter.delete('/:id', authMiddleware, restrictTo("admin"), deleteSession)
sessionRouter.put('/:id', authMiddleware, restrictTo("admin"), updateSession)
sessionRouter.post('/', authMiddleware, restrictTo("admin"), postSession)

module.exports = sessionRouter;