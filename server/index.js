const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const PORT = 5000;

// importing routes
const teacherRoutes = require('./Routes/teacher/teacher');
const studentRoutes = require('./Routes/student/student');

mongoose.connect('mongodb+srv://akash_singh:Akash123@cluster0.axwdu.mongodb.net/education_webapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected")
    console.log(mongoose.connection.readyState)
});

app.use(bodyParser.json())

app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);

app.get('/', (req, res) => {
    res.send("Hello home page ")
})
app.post('/', (req, res) => {
    console.log(req.body);
    res.send("got the response!!")
})

app.listen(PORT, () => {
    console.log("Server is running on port 5000");
})