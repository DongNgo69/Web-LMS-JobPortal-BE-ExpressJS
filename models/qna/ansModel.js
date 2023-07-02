const mongoose = require('mongoose'); // Erase if already required

let answerSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
        required: true,
    }, 
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
module.exports = mongoose.model('Answer', answerSchema);