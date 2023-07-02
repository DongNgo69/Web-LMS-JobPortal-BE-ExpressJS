const mongoose = require('mongoose'); // Erase if already required

let qnaSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    slug: {
        type: String,
        require: true,
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    },
    answer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Answer",
    },
    featured: {
        type: Boolean,
        default:false,
    },
},{
    timestamps: true, 
}
);

//Export the model
module.exports = mongoose.model('QNA', qnaSchema);