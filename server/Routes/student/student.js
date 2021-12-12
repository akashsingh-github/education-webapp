const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const students = require('../../Model/student');

router.post('/register', async (req, res) => {
    const {
        name,
        email,
        password:plaintext,
        dob,
        gender,
        courses
    } = req.body;

    if(typeof name != 'string'){
        return res.json({status: 'ok', msg: 'Invalid Name'})
    }
    if(typeof email != 'string'){
        return res.json({status: 'ok', msg: 'Invalid Name'})
    }

    if(!plaintext || typeof plaintext != 'string'){
        return res.json({status: 'error', error: 'Invalid password'})
    }
    if(plaintext.length < 6){
        return res.json({status: 'error', error: 'Password should greater than 6 character'})
    }
    const password = await bcrypt.hash(plaintext, 10);
    try{
        const newStudent = await students.create({
            name,
            email,
            password,
            dob,
            gender,
            courses
        })
        console.log("New student created successfully", newStudent);
        res.send("Successfully added the data!!!")
    } catch(err){
        if(err === 11000){
            // duplicate key error
            return res.json({status: 'ok', msg: 'Email already exists'})
        }
        throw err;
    }
})

router.post('/sign-in', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const getStudent = await students.findOne({email}).lean();

    if(!getStudent){
        return res.json({status: 'ok', msg: 'Email does not exists!!!'})
    }
    if( await bcrypt.compare(password, getStudent.password)){
        return res.json({status: 'ok', msg: 'Sucessfully login', data: getStudent })
    } else{
        return res.json({status: 'ok', msg: 'Email Id or password not matched!!'})
    }
})

router.post('/:student_id/enroll_new_course', async (req, res) => {
    const {
        student_id
    } = req.params;
    const {
        course_id,
        course_enrolled_date,
        course_fees,
        course_lessons,
        final_assessment
    } = req.body;

    const newCourse = {
        course_id,
        course_enrolled_date,
        course_fees,
        course_lessons,
        final_assessment
    }

    const filter = {'_id': student_id}
    try{
        let addCourse = await students.updateOne(filter,
            {$push: {'courses': newCourse}}    
        )
        console.log("New course added");
        res.send("New course enrolled successfully!!!")
    } catch(err){
        throw err;
    }
})

router.post('/:student_id/:course_id/add_new_lesson', async (req, res) => {
    const {
        student_id,
        course_id
    } = req.params;

    const {
        lesson_id,
        lesson_title,
        lesson_obtained_marks,
        lesson_total_marks
    } = req.body;

    const newLesson = {
        lesson_id,
        lesson_title,
        lesson_obtained_marks,
        lesson_total_marks
    }

    try{
        let addLesson = await students.updateOne(
            {'_id': student_id, "course_id": course_id},
            {
                "$push":
                {
                    "courses.$[].course_lessons": newLesson
                }
            }
        )
        res.send("New lesson added to the course");
        console.log("new lesson added to the course");    
    } catch(err){
        throw err;
    }
})

router.post('/:student_id/:course_id/add_final_assessment', async (req, res) => {
    const {
        student_id,
        course_id
    } = req.params;

    const {
        assessment_id,
        assessment_obtained_marks,
        assessment_total_marks
    } = req.body

    const newFinalAssessment = {
        assessment_id,
        assessment_obtained_marks,
        assessment_total_marks
    }

    try{
        addAssessment = await students.updateOne(
            {'_id': student_id, 'course_id': course_id},
            {
                "courses.$[].final_assessment" : newFinalAssessment
            }
        )
        console.log("Final assessment updated");
        res.send("Final assessment added to the course");
    }catch(err){
        throw err;
    }
})

module.exports = router;