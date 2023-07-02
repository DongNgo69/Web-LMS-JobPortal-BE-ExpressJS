const Lesson = require('../models/lessonModel');
const Course = require('../models/courseModel');
const asyncHandler = require('express-async-handler');
const {default: slugify} = require('slugify');
const validateMongoDbId = require('../config/validateMongoDbId');

const postLesson = asyncHandler(async (req, res) => {
    const {courseId} = req.user
    try{
        const findCourse = await Course.findById(courseId)
        if (findCourse){
            if (req.body.title){
                req.body.slug = slugify(req.body.title.toLowerCase());
            }
            const lesson = await new Lesson.create(req.body)
            await Course.findByIdAndUpdate(
                courseId,
                {
                    $push: { lessons: lesson._id},
                },
                {new: true}
            )
            res.status(200).json({
                status: true,
                message: "Đăng lesson thành công",
                lesson,
                findCourse
            });
        }else{
            throw new Error("Không có Course nào trùng khớp")
        }
    } catch (e){
        throw new Error(e);
    }
})
const getLesson = asyncHandler(async (req, res) => {
    const {lessonId} = req.params;
    validateMongoDbId(lessonId)
    try{
        const lesson = await Lesson.findOne({lessonId : lessonId});
        res.status(200).json({
            status: true,
            message: "Lấy lesson thành công",
            lesson
        });
    }catch (e){
        throw new Error(e);
    }
})
// const getAllCourseByCategory = asyncHandler(async (req, res) => {
//     const {type} = req.params;
//     try{
//         const course = await Course.find({category:type});
//         res.status(200).json({
//             status: true,
//             message: "Lấy danh sách course thành công",
//             course
//         });
//     }catch (e){
//         throw new Error(e);
//     }
// })
const getAllLesson = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    validateMongoDbId(courseId);
    try{
        const lesson = await Course
            .find()
            .where({_id: courseId})
            .select("lessons");
        res.status(200).json({
            status: true,
            message: "Lấy danh sách lesson thành công",
            lesson
        });
    }catch (e){
        throw new Error(e);
    }
})
const deleteLesson = asyncHandler(async (req, res) => {
    const {courseId, lessonId} = req.params;
    try {
        const findCourse = await Course.findByIdAndUpdate(
            courseId,
            { $pull: {lessons: lessonId}},
            { new: true}
        );
        const findLesson = await Lesson.findByIdAndDelete(lessonId);
        res.status(200).json({
            status: true,
            message: "Xóa lesson thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})
const updateLesson = asyncHandler(async (req, res) => {
    const {lessonId} = req.params;
    validateMongoDbId(id)
    try {
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        const lesson = await Lesson.findByIdAndUpdate(
            lessonId,
            req.body,
            {new: true}
        );
        res.status(200).json({
            status: true,
            message: "Sửa lesson thành công",
            lesson,
        })
    }catch (e){
        throw new Error(e);
    }
})
// const getCourseIntructor = asyncHandler(async (req, res) => {
//     const {_id} = req.user;
//     validateMongoDbId(_id);
//     try {
//         const course = await Course.find({instructor: _id})
//         res.status(200).json({
//             status: true,
//             message: "Lấy danh sách course thành công",
//             course
//         })
//     } catch (e) {
//         throw new Error(e)
//     }
// })
module.exports = {
    postLesson,
    getLesson,
    // getAllCourseByCategory,
    deleteLesson,
    updateLesson,
    getAllLesson,
    // getCourseIntructor,
}