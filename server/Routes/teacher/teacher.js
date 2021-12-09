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

router.get('/teacher_list', (req, res) => {
    const getRecords = teachers.find({}).lean()
    res.send(getRecords)
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

module.exports = router;