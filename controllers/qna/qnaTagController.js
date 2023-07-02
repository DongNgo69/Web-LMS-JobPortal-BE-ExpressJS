const Qnatag = require('../../models/qna/tagModel')
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('../customController')

const postTag = createOne(Qnatag)
const updateTag = updateOne(Qnatag)
const deleteTag = deleteOne(Qnatag)
const getTag = getOne(Qnatag)
const getAllTag = getAll(Qnatag)

module.exports = {
    postTag,
    updateTag,
    deleteTag,
    getTag,
    getAllTag
}