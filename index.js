const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Express App
const app = new express();

//Database connection
mongoose.connect('mongodb://localhost/blogX').then(()=>{
    console.log('Data Base Connected');
}).catch((err) => {
    console.log(err)
})

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//custom middlewares

app.use('/auth/',require('./router/auth'))
app.use('/user', require('./router/user'))

//linstening
app.listen(3000, ()=> {
    console.log('Server is Started')
})