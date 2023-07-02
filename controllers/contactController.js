const Contact = require("../models/contactModel");
const asyncHandler = require('express-async-handler');
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('./customController')

const createContact = createOne(Contact)
const deleteContact = deleteOne(Contact)
const getAContact = getOne(Contact)
const getAllContact = getAll(Contact)

const updateContactStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try{
        const contact = await Contact.findByIdAndUpdate(
            id,
            {status: req.body.status},
            {new:true}
        )
        res.status(200).json({
            status: true,
            message: "Cập nhật trạng thái enquiry thành công",
        })
    }catch (e){
        throw new Error(e);
    }
})





module.exports = {
    createContact,
    getAllContact,
    getAContact,
    deleteContact,
    updateContactStatus
}