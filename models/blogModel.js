const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    category: {
        type:String,
        required: true,
    },
    thumbnail:{
        type:String,
        default:"https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    },
    description:{
        type:String,
        required:true,
    },
    keywords: {
        type: [],
        required:true,
    }
},{
    timestamps: true,
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);