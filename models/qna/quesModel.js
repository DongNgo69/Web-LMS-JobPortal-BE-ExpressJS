const mongoose = require('mongoose'); // Erase if already required

let questionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Qnatag",
        }
    ],
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Qnacomment",
        }
    ],
    voteCount: {
        type: Number,
        default: 0,
    },
    upVotes: [
        {
            name: String,
            createdAt: String
        }
    ],
    downVotes: [
        {
            name: String,
            createdAt: String
        }
    ]
},{
    timestamps: true, 
}
);

//Export the model
module.exports = mongoose.model('Question', questionSchema);