const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    category: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    author: {
        type: String,
        default: "Dong Ngo",
    },
    links: [{
        name: String,
        url: String
    }],
    price: {
        type: Number,
        default: 0,
    },
    priceAfterDiscount: {
        type: Number,
        default: 0,
    },
    images:[],
    isPublished: {
        type: Boolean,
        default: false
    },
    techStack: [],
    keywords: []
},{
    timestamps: true
}
);

//Export the model
module.exports = mongoose.model('Project', projectSchema);