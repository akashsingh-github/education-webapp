const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://akashsingh:Edu@1234@cluster0.ngyfv.mongodb.net/education_webapp?retryWrites=true&w=majority', 
() => {
    console.log(mongoose.connection.readyState)
})