const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    subject: {
        type:String,
        required:true,
    },
    profession: {
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    status: {
        type:String,
        default: "Submitted",
    }
}, {
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('Contact', contactSchema);