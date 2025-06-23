const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const dotenv = require("dotenv").config();

connectDb();

const app=express();

const port = process.env.PORT || 5000;

app.use(express.json()); // This will help us to provide a perser which will help us to perse the datastring that we recieve from the client on the server side  

// app.get('/api/contacts', (req,res)=>{
//     // res.send("Get all contact");
//     // res.json({message:"Get all contact"});
//     res.status(200).json({message:"Get all contacts"});
// })

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
    
});
