const Question = require('../../models/qna/quesModel')
const Answer = require('../../models/qna/ansModel')
const Qna = require('../../models/qna/qnaModel')
const QnaTag = require('../../models/qna/tagModel')
const Qnacomment = require('../../models/qna/qnacommentModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../../config/validateMongoDbId');
const {
    getOne,
    getAll,
    updateOne
} = require('../customController')
const createPost = asyncHandler(async (req, res) => {
    const {id} = req.user;
    validateMongoDbId(id)
    try {
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        if (req.body.tag){
            req.body.tag.forEach(async (element) => {
                const updateTagCount = await QnaTag.findByIdAndUpdate(
                    element, 
                    { $inc: {totalquestion: + 1 }},
                    {new : true}
                )
            })
        }
        const newQues = await Question.create(req.body)
        const post = await Qna.create({
            user: id,
            question: newQues?._id,
            slug: req.body.slug,
        })
        res.status(200).json({
            status: true,
            message: "Đăng thành công"
        })
    } catch (e){
        throw new Error(e);
    }
})
const createAnswer = asyncHandler(async (req, res) => {
    const {id} = req.user;
    const {postId} = req.params;
    validateMongoDbId(id)
    try {
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        const data = {
            user: id,
            ...req.body,
        }
        const newAns = await Answer.create(data)
        const post = await Qna.findByIdAndUpdate(
            postId,
            {answer: newAns?._id},
            {new: true}
        )
        res.status(200).json({
            status: true,
            message: "Comment thành công"
        })
    } catch (e){
        throw new Error(e);
    }
})
const getQuestion = getOne(Qna, "question answer");
const getAllQuestion = getAll(Qna, "question answer");

const deleteAQuestion = asyncHandler(async (req, res) => {
    const { postId, quesId, ansId } = req.params
    validateMongoDbId(postId)
    validateMongoDbId(quesId)
    if (ansId && ansId !== "null") validateMongoDbId(ansId)
    try {
        const deletePost = await Qna.findByIdAndDelete(postId)
        const deleteQues = await Qna.findByIdAndDelete(quesId)
        if (ansId && ansId !== "null") await Answer.findByIdAndDelete(ansId)
        res.status(200).json({
            status: true,
            message: "Xóa thành công"
        })
    }catch (e){
        throw new Error(e);
    }
})
const addComment = asyncHandler(async (req, res) => {
    const {quesId} = req.params;
    const {id} = req.user;
    validateMongoDbId(id);
    validateMongoDbId(quesId);
    try {
        const createComment = await Qnacomment.create({user: id, comment: req.body.comment})
        const findQuestion = await Question.findByIdAndUpdate(
            quesId,
            { $push: { comments: createComment._id}},
            { new: true}
        ) 
        res.status(200).json({
            status: true,
            message: "Comment thành công"
        })       
    }catch (e){
        throw new Error(e);
    }
})
const deleteComment = asyncHandler(async (req, res) => {
    const {quesId, commentId} = req.params;
    validateMongoDbId(quesId);
    validateMongoDbId(commentId);
    try {
        const deleteComment = await Qnacomment.findByIdAndDelete(commentId)
        const findQuestion = await Question.findByIdAndUpdate(
            quesId,
            { $pull: { comments: commentId}},
            { new: true}
        ) 
        res.status(200).json({
            status: true,
            message: "Xóa Comment thành công"
        })       
    }catch (e){
        throw new Error(e);
    }
})
const updateQuestion = updateOne(Question)
const updateAnswer = updateOne(Answer)
module.exports = {
    createPost,
    getQuestion,
    getAllQuestion,
    deleteAQuestion,
    updateQuestion,
    updateAnswer,
    createAnswer,
    addComment,
    deleteComment
}