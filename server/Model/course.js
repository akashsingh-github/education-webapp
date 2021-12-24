const mongoose = require('mongoose');

const studentLessonSchema = mongoose.Schema({
    lesson_id: {
        type: String,
        required: true
    },
    lesson_total_marks : {
        type: String,
        required: true
    },
    lesson_obtain_marks: {
        type: String,
        required: true
    }
})

const studentSchema = mongoose.Schema({
    student_name:{
        type: String,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    student_email: {
        type: String,
        required: true
    },
    student_gender: {
        type: String,
        required: true
    },
    student_paid_fees: {
        type: String
    },
    student_lessons_marks: [studentLessonSchema],
    student_final_marks: {
        type: String
    }
})

const questionSchema = mongoose.Schema({
    question: {
        type: String
    },
    answer: {
        type: String
    }
})

const lessonSchema = mongoose.Schema({
    lesson_title: {
        type: String,
        required: true
    },
    lesson_description: {
        type: String,
        required: true
    },
    lesson_tags: [String],
    lesson_content: {
        type: String,
        required: true
    },
    lesson_assessment: [questionSchema]
})

const finalAssessmentSchema = mongoose.Schema({
    total_marks: {
        type: String,
        required: true
    },
    assessment_questions: [questionSchema]
})

const courseSchema = mongoose.Schema({
    course_title: {
        type: String,
        required: true
    },
    course_description: {
        type: String,
        required: true
    },
    course_duration: {
        type: String,
        required: true
    },
    course_fees: {
        type: String,
        required: true
    },
    course_creation_date: {
        type: String,
        required: true
    },
    teacher_name: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    },
    isAuthorized: {
        type: String,
        required: true
    },
    course_lessons: [lessonSchema],
    course_students : [studentSchema],
    final_assessment : finalAssessmentSchema
}, {collection: 'courses'});
const model = mongoose.model('courses', courseSchema);
module.exports = model;