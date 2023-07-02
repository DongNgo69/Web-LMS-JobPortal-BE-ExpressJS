const Work = require("../models/workModel");
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('./customController')

const postDetails = createOne(Work)
const updateDetails = updateOne(Work)
const deleteDetails = deleteOne(Work)
const getDetails = getOne(Work)
const getAllDetails = getAll(Work)



module.exports = {
    postDetails,
    updateDetails,
    deleteDetails,
    getDetails,
    getAllDetails
}