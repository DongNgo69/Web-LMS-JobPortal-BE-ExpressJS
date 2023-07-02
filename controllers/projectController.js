const Project = require ("../models/projectModel");
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
} = require('./customController')

const postProject = createOne(Project)
const updateProject = updateOne(Project)
const deleteProject = deleteOne(Project)
const getProject = getOne(Project)
const getAllProject = getAll(Project)

module.exports = {
    postProject,
    updateProject,
    deleteProject,
    getProject,
    getAllProject
}