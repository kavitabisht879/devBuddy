const express = require("express");

const app = express()
app.use( "/test",(req,res)=>{
    res.send("test")
});

app.use("/hello" ,(req,res)=>{
    res.send("hello")
})

app.listen("3000")