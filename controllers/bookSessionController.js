const Session = require ("../models/sessionModel");
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('./customController')

const postSession = createOne(Session)
const updateSession = updateOne(Session)
const deleteSession = deleteOne(Session)
const getSession = getOne(Session)
const getAllSession = getAll(Session)

module.exports = {
    postSession,
    updateSession,
    deleteSession,
    getSession,
    getAllSession
}