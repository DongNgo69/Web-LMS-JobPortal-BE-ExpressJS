const express = require('express');
const qnaRouter = express.Router();
const { 
    createPost,
    getQuestion,
    getAllQuestion,
    deleteAQuestion,
    updateQuestion,
    updateAnswer,
    createAnswer,
    addComment,
    deleteComment
} = require('../controllers/qna/qnaController');
const { 
    postTag,
    updateTag,
    deleteTag,
    getTag,
    getAllTag
} = require('../controllers/qna/qnaTagController');
const {
    authMiddleware,
    restrictTo
} = require('../middlewares/authMiddleware');


qnaRouter.get('/post/:slug', getQuestion)
qnaRouter.get('/post' , getAllQuestion)
qnaRouter.get('/tag/:slug', getTag)
qnaRouter.get('/tag' , getAllTag)

qnaRouter.post('/post', authMiddleware, createPost)
qnaRouter.post('/post/answer', authMiddleware, createAnswer)
qnaRouter.post('/post/comment/:quesId', authMiddleware, addComment)
qnaRouter.delete('/post/comment/delete/:quesId/:commentId', authMiddleware, deleteComment)
qnaRouter.put('/post/:id',authMiddleware, updateQuestion)
qnaRouter.put('/post/answer/:id',authMiddleware, updateAnswer)
qnaRouter.delete('/post/:postId/:quesId/:ansId',authMiddleware, deleteAQuestion)

qnaRouter.get('/tag' , authMiddleware, restrictTo("admin"), postTag)
qnaRouter.put('/tag/:id',authMiddleware, restrictTo("admin", "user"), updateTag)
qnaRouter.delete('/tag/:id',authMiddleware, restrictTo("admin"), deleteTag)
module.exports = qnaRouter