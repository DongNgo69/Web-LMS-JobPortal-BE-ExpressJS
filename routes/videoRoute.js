const express = require('express');
const videoRouter = express.Router();
const { 
    postVideo,
    getVideo,
    getAllVideo,
    deleteVideo,
    updateVideo
} = require('../controllers/videoController');
const { 
    isAdmin, 
    authMiddleware,
} = require('../middlewares/authMiddleware');

videoRouter.get('/', getAllVideo)
videoRouter.get('/:slug', authMiddleware, getVideo)
videoRouter.delete('/:id', authMiddleware, isAdmin, deleteVideo)
videoRouter.put('/:id', authMiddleware, isAdmin, updateVideo)
videoRouter.post('/', authMiddleware, isAdmin, postVideo)

module.exports = videoRouter;