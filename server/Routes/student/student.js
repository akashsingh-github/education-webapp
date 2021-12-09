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
        gender
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
            gender
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

module.exports = router;