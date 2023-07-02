const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt'); // hàm băm mật khẩu
const crypto = require('crypto')
let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index: true
    },
    mobile:{
        type:String,
        unique:true,
        index: true
    },
    password:{
        type:String,
    },
    user_image: {
        type: String,
        default: "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png",
    },
    roles: {
        type:String,
        enum: ["user", "instructor", "admin", "company"],
        default: "user"
    },
    isBlocked: {
        type:Boolean,
        default: false
    },
    profession: {
        type: String,
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
    courses: []
},{
    timestamps: true, 
}
);
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.isPasswordMatched = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
}

userSchema.methods.createPasswordResetToken = async function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    this.passwordResetExpire = Date.now() + 30*60*1000; // 10 minutes
    return resetToken;
}
//Export the model
module.exports = mongoose.model('User', userSchema);