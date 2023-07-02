const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
        minlength: 3,
        maxlength: 350
    },
    slug:{
        type:String,
        required:true,
    },
    category: {
        type:String,
        required: true,
    },
    image:{
        type:String,
        default:"https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    },
    description:{
        type:String,
        required:true,
        minlength: 3,
        maxlength: 5000,
    },
    price: {
        type: Number,
        default:0,
    },
    published: {
        type:Boolean,
        default:false,
    },
    paid: {
        type:Boolean,
        default:false,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
        }
    ],
    totalHours: {
        type: String,
        default: 0,
    },
    enrolls: {
        type: String,
        default: 0,
    },
    ratings: [
        {
            stars: Number,
            comment: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        }
    ],
    totalRatings: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Course', courseSchema);