const express = require('express');
const courseRouter = express.Router();
const { 
    postCourse,
    getCourse,
    getAllCourseByCategory,
    deleteCourse,
    updateCourse,
    getAllCourse,
    getCourseIntructor,
    checkEnrollment,
    freeEnrollment
} = require('../controllers/courseController');
const {
    postLesson,
    deleteLesson,
    getLesson,
    getAllLesson,
    updateLesson
} = require('../controllers/lessonController');
const { 
    isAdmin, 
    authMiddleware,
    isBoth,
} = require('../middlewares/authMiddleware');

courseRouter.get('/all', getAllCourse)
courseRouter.get('/:type', getAllCourseByCategory)
courseRouter.get('/:slug',getCourse)

courseRouter.post('/check-enrollment/:courseId', authMiddleware, checkEnrollment)
courseRouter.post('/free-enrollment/:courseId', authMiddleware, freeEnrollment)

courseRouter.get('/instructor/all-courses', authMiddleware, isBoth, getCourseIntructor)
courseRouter.delete('/:id', authMiddleware, isBoth, deleteCourse)
courseRouter.put('/:id', authMiddleware, isBoth, updateCourse)
courseRouter.post('/', authMiddleware, isBoth, postCourse)

courseRouter.post('/check-enrollment/:courseId', authMiddleware, checkEnrollment)
courseRouter.post('/free-enrollment/:courseId', authMiddleware, freeEnrollment)

//lesson
courseRouter.get('/lesson/:id', authMiddleware, isBoth, getLesson)
courseRouter.get('/lessons/:courseId', authMiddleware, isBoth, getAllLesson)
courseRouter.post('/lesson/:courseId', authMiddleware, isBoth, postLesson)
courseRouter.put('/lesson/:lessonId', authMiddleware, isBoth, updateLesson)
courseRouter.delete('/lesson/:courseId/:lessonId', authMiddleware, isBoth, deleteLesson)

module.exports = courseRouter;