const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId= require('../config/validateMongoDbId')
const crypto = require('crypto');
const { sendEmail } = require('./emailController');

const registerUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    //check mail xem tồn tại trong hệ thống hay chưa
    const findUser = await User.findOne({ email: email});
    if (!findUser) {
        const createUser = await User.create(req.body)
        res.status(200).json({
            status: true,
            message: "Tạo tài khoản thành công!",
            createUser
        });
    } else {
        throw new Error("Email đã tồn tại!")
    }
})
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    //check xem tài khoản có tồn tại k
        const findUser = await User.findOne({ email: email });
        if (findUser && (await findUser.isPasswordMatched(password))) {
            res.status(200).json({
                status: true,
                message: "Đăng nhập thành công!",
                token: generateToken(findUser?._id),
                role: findUser?.roles,
                username: findUser?.name,
                user_image: findUser?.user_image
            })
        } else {
            // res.status(401)
            throw new Error("Sai thông tin đăng nhập")
        }
})
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(200).json({
            status: true,
            message: "Lấy danh sách User thành công",
            allUser
        })
    } catch(e) {
        throw new Error(e);
    }
})
const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getProfile = await User.findById(id);
        res.status(200).json({
            status: true,
            message: "Lấy thông tin  User thành công",
            getProfile
        })
    } catch(e) {
        throw new Error(e);
    }
})
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findByIdAndUpdate(
            _id, 
            req.body, 
            { new: true}
        )
        res.status(200).json({
            status: true,
            message: "Cập nhật thông tin thành công",
            user
        })
    } catch(e) {
        throw new Error(e);
    }
})
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Xóa User thành công!"
        })
    } catch(e) {
        throw new Error(e);
    }
})
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id, 
            {isBlocked: true},
            { new: true}
        )
        res.status(200).json({
            status: true,
            message: "Block User thành công!",
        })
    } catch(e) {
        throw new Error(e);
    }
})
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(
            id, 
            {isBlocked: false},
            { new: true}
        )
        res.status(200).json({
            status: true,
            message: "Unblock User thành công!",
        })
    } catch(e) {
        throw new Error(e);
    }
})
const changePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    try {
        const user = await User.findById(_id);
        if (user && password && (await user.isPasswordMatched(password))){
            throw new Error("Nhập password mới")
        } else {
            user.password = password;
            await user.save();
            res.status(200).json({
                status: true,
                message: "Đổi mật khẩu thành công!",
            })
        }
    } catch(e) {
        throw new Error(e);
    }
})
// forgot password
const forgotPasswordToken = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email: email});
    if (!user) throw new Error("Email không tồn tại!");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetLink = `https://localhost:4000/api/user/reset-password/${token}`;
        const data = {
            to: email,
            text: `Chào ${user.name} `,
            subject: "Bấm vào link này để đổi mật khẩu của bạn",
            htm: resetLink
        }
        sendEmail(data)
        res.status(200).json(resetLink);
    } catch (e) {
        throw new Error(e)
    }
})
const resetPassword = asyncHandler(async (req, res) => {
    const {password} = req.body;
    const {token} = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpire: { $gt: Date.now() }
    });
    if (!user) throw new Error("Token đã hết hạn, vui lòng thử lại sau!")
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();
    res.status(200).json({
        status: true,
        message: "Đổi mật khẩu thành công!",
    })
})

module.exports = {
    registerUser,
    loginUser,
    getAllUser,
    getAUser,
    updateUser,
    deleteUser,
    unblockUser,
    blockUser,
    changePassword,
    forgotPasswordToken,
    resetPassword
};