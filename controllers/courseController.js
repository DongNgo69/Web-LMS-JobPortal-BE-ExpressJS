const Course = require('../models/courseModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const {default: slugify} = require('slugify');
const validateMongoDbId = require('../config/validateMongoDbId');

const postCourse = asyncHandler(async (req, res) => {
    const {_id} = req.user
    validateMongoDbId(_id)
    try{
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        if(_id){
            req.body.instructor = _id
        }
        const course = await Course.create(req.body)
        res.status(200).json({
            status: true,
            message: "Đăng course thành công",
        });
    } catch (e){
        throw new Error(e);
    }
})
const getCourse = asyncHandler(async (req, res) => {
    const {slug} = req.params;
    try{
        const course = await Course.findOne({slug:slug});
        res.status(200).json({
            status: true,
            message: "Lấy course thành công",
            course
        });
    }catch (e){
        throw new Error(e);
    }
})
const getAllCourseByCategory = asyncHandler(async (req, res) => {
    const {type} = req.params;
    try{
        const course = await Course.find({category:type});
        res.status(200).json({
            status: true,
            message: "Lấy danh sách course thành công",
            course
        });
    }catch (e){
        throw new Error(e);
    }
})
const getAllCourse = asyncHandler(async (req, res) => {
    try{
        const course = await Course.find().populate("instructor");
        res.status(200).json({
            status: true,
            message: "Lấy danh sách course thành công",
            course
        });
    }catch (e){
        throw new Error(e);
    }
})
const deleteCourse = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const course = await Course.findByIdAndDelete(id);
        res.status(200).json({
            status: true,
            message: "Xóa course thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})
const updateCourse = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        if (req.body.title){
            req.body.slug = slugify(req.body.title.toLowerCase());
        }
        const course = await Course.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        res.status(200).json({
            status: true,
            message: "Sửa course thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})
const getCourseIntructor = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongoDbId(_id);
    try {
        const course = await Course.find({instructor: _id})
        res.status(200).json({
            status: true,
            message: "Lấy danh sách course thành công",
            course
        })
    } catch (e) {
        throw new Error(e)
    }
})
const checkEnrollment = asyncHandler(async (req, res) => {
    const {id} = req.user;
    const {courseId} = req.params
        const user = await User.findById(id)
        let ids = [];
        for (let i = 0; i < user.courses.length; i++) {
            if (user.courses.length > 0) {
                ids.push(user.courses[i].toString());
            }
        }
        res.status(200).json({
            status: ids.includes(courseId),
            message: "Lấy danh sách course thành công",
            course: await Course.findById(courseId).exec(),
        })
})
const freeEnrollment = asyncHandler(async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (course.paid) {
            return
        }
        const addCourseToUser = await User.findByIdAndUpdate(
            req.user.id, 
            { $push: {courses: course?._id}},
            {new: true}
        )
        res.status(200).json({
            status: true,
            message: "Thêm course thành công",
        })
    } catch (e) {
        throw new Error(e)
    }
})
module.exports = {
    postCourse,
    getCourse,
    getAllCourseByCategory,
    deleteCourse,
    updateCourse,
    getAllCourse,
    getCourseIntructor,
    getCourseIntructor,
    checkEnrollment,
    freeEnrollment
}