const express = require('express');
const app=express();
//to use dotenv variables
require('dotenv').config()
const dbconfig =require("./config/dbConfig");

const port=process.env.PORT || 5000;


app.listen(port,()=>{
    console.log(`node server listening on port ${port}`)
})

