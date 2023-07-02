const mongoose = require('mongoose'); // Erase if already required

let qnacommentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comment:{
        type: String,
        required: true,
    },
},{
    timestamps: true, 
}
);

//Export the model
module.exports = mongoose.model('Qnacomment', qnacommentSchema);