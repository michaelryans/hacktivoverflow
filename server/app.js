require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const router = require('./routes')
const kue = require('kue')


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hacktivoverflow-test', {useNewUrlParser:true})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


app.use('/', router)

// module.exports = app;

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})



kue.app.listen(5000)
