const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    lang_name: {
        type: String,
    },
    lang_exp: {
        type: String
    }
})

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profile_statement: {
        type: String,
        required: true
    },
    teaching_exp:{
        type: String,
        required: true
    },
    known_programming_lang: [experienceSchema]
},{collection: 'teachers'})

const model = mongoose.model('teachers', teacherSchema);
module.exports = model;