const express = require('express');
const userRouter = express.Router();
const {
    registerUser,
    loginUser,
    getAllUser,
    updateUser,
    deleteUser,
    getAUser,
    unblockUser,
    blockUser,
    changePassword,
    resetPassword,
    forgotPasswordToken
} = require('../controllers/userController');
const { 
    isAdmin, authMiddleware,

} = require('../middlewares/authMiddleware');

userRouter.post('/register', registerUser);
// userRouter.post('/register', rateLimit(60 * 60 * 1000, 2, "Secs", 2) registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/forgot-password', forgotPasswordToken);
userRouter.put('/reset-password/:token', resetPassword);

userRouter.put('/update-profile', authMiddleware, updateUser);
userRouter.get('/:id', authMiddleware, getAUser);
userRouter.put('/update-password', authMiddleware, changePassword);

//only admin routes
userRouter.get('/all-users', authMiddleware, isAdmin, getAllUser)
userRouter.delete('/:id', authMiddleware, isAdmin, deleteUser);
userRouter.put('/block/:id', authMiddleware, isAdmin, blockUser);
userRouter.put('/unblock/:id', authMiddleware, isAdmin, unblockUser);
module.exports = userRouter