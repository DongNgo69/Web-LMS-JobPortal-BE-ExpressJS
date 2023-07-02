const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var workSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        required:true,
    },
    currentjob: {
        type:String,
        required:true,
    },
    resume: {
        type:String,
        required:true,
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Work', workSchema);