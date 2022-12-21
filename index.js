const express = require('express')
const app = require('./src/app')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
const uri= "mongodb+srv://vaibhav:vaibhav141997@almabetter.qolyqo7.mongodb.net/?retryWrites=true&w=majority"
// Connect to DATABASE
const DATABASE_URL = uri;
const db = mongoose.connection
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err){
        console.log("Failed to connect to db")
    }
    else{
        console.log("Successfully connnected to db")
    }
});


// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
