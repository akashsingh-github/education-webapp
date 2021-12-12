const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const teachers = require('../../Model/teachers');

router.post('/register', async (req, res) => {
    const {
        name,
        email,
        password:plaintext, 
        gender,
        profile_statement,
        teaching_exp,
        known_programming_lang
    } = req.body;
    if(!plaintext || typeof plaintext != 'string'){
        return res.json({status: 'error', msg: 'Invalid password'})
    }
    if(plaintext.length < 6){
        return res.json({status: 'error', msg: 'Password should greater than 6 character'})
    }
    const password = await bcrypt.hash(plaintext, 10);
    try{
        console.log("exe")
        const newTeacher = await teachers.create({
            name,
            email,
            password, 
            gender,
            profile_statement,
            teaching_exp,
            known_programming_lang
        })
        console.log("user created successfull", newTeacher);
    } catch(err){
        if(err === 11000){
            // duplicate key error
            return res.json({status: 'ok', msg: 'Email already exists!!'})
        }
        throw err;
    }
    console.log(req.body)
})

router.post('/sign-in', async (req, res) => {
    const {email, password} = req.body;
    const getTeacher = await teachers.findOne({email}).lean();
    if(!getTeacher){
        res.json({status: 'ok', msg: 'Email not found!!!'})
    }
    if(await bcrypt.compare(password, getTeacher.password)){
        return res.json({status: 'ok', msg: 'Teacher login successfull'})
    }
    else{
        return res.json({status: 'ok', msg: 'Incoreect email or password!!!'})
    }
})

router.get('/teacher_list', (req, res) => {
    teachers.find((err, docs) => {
        if(err) throw err;
        res.send(docs)
    })
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const getTeacher = await teachers.findOne({'_id':id}).lean()
    res.send(getTeacher)
})

router.put('/register/:id', async (req, res) => {
    const {id} = req.params;

    const {
        name,
        email,
        gender,
        profile_statement,
        teaching_exp,
        known_programming_lang
    } = req.body;
    const update = {
        'name':name,
        'email':email,
        'gender':gender,
        'profile_statement':profile_statement,
        'teaching_exp': teaching_exp,
        'known_programming_lang': known_programming_lang
    }
    const filter = {'_id': id}
    try{
        let updateTeacher = await teachers.findOneAndUpdate(filter, update)
        console.log("Teacher updated", updateTeacher);
        res.send('got the response')
    } catch(err){
        throw err;
    }
})


router.post('/:teacher_id/add-experience', async (req, res) => {
    const {
        lang_name,
        lang_exp
    } = req.body;
    const {teacher_id} = req.params;
    const filter = {'_id': teacher_id}
    const newElement = {
        lang_name,
        lang_exp
    }
    try{
        let addElement = await teachers.updateOne(filter, 
            {$push: {'known_programming_lang': newElement }}    
        )
        console.log("Added the new element", addElement)
        res.send("Updated the response");
    }catch(err){
        throw err;
    }
})

module.exports = router;