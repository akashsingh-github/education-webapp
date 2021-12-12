const mongoose = require('mongoose');

const studentCourseLessonSchema = mongoose.Schema({
    lesson_id: {
        type: String,
        required: true
    },
    lesson_title: {
        type: String,
        required: true
    },
    lesson_obtained_marks: {
        type: String,
        required: true
    },
    lesson_total_marks: {
        type: String,
        required: true
    }
})

const studentFinalAssessmentSchema = mongoose.Schema({
    assessment_id: {
        type: String,
        required: true
    },
    assessment_obtained_marks: {
        type: String,
        required: true
    },
    assessment_total_marks: {
        type: String,
        required: true
    }
})

const studentCourseSchema = mongoose.Schema({
    course_id: {
        type: String
    },
    course_enrolled_date: {
        type: String,
        required: true
    },
    course_fees: {
        type: Number,
        required: true
    },
    course_lessons: [studentCourseLessonSchema],
    final_assessment: studentFinalAssessmentSchema
})

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    courses: [studentCourseSchema]
}, {collection: 'students'})
const model = mongoose.model('students', studentSchema);
module.exports = model;