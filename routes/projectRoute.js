const express = require('express');
const projectRouter = express.Router();
const { 
    postProject,
    updateProject,
    deleteProject,
    getProject,
    getAllProject
} = require('../controllers/projectController');
const { 
    restrictTo, 
    authMiddleware,
} = require('../middlewares/authMiddleware');


projectRouter.get('/', getAllProject)
projectRouter.get('/:slug', restrictTo("admin"), getProject)
projectRouter.delete('/:id', authMiddleware, restrictTo("admin"), deleteProject)
projectRouter.put('/:id', authMiddleware, restrictTo("admin"), updateProject)
projectRouter.post('/', authMiddleware, restrictTo("admin"), postProject)

module.exports = projectRouter;