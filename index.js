const express = require('express');
const app = express();
const PORT = 8000;
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/mongoose');
app.use(express.json());

app.use('/',require('./routes'));

app.listen(PORT,function(err){
    if(err){
        console.log("Error "+ err);
        return;
    }
    console.log("Successfully Running on Port: "+ PORT);
})