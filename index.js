const express = require('express');  
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const dotenv = require('dotenv');  
const path = require("path");  
const bcrypt = require('bcrypt');  
const { stringify } = require('querystring');

const app = express();  
dotenv.config();  

const port = process.env.PORT || 8000;  

app.use(bodyParser.json());  
app.use(express.static(path.join(__dirname, 'Pages')));  
app.use(bodyParser.urlencoded({ extended: true }));  

const username=process.env.MONGODB_USERNAME;
const password=process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@backened.qttzayb.mongodb.net/RegistrationFormDB`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});  

const registrationSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const Registartion=mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get("/", (req, res) => {  
    console.log("hello");  
    res.sendFile(__dirname= '/Pages/index.html');  
});  

// var db = mongoose.connection;  
// db.on('error', () => {  
//     console.log("Error is connecting to database");  
// });  
// db.once('open', () => {  
//     console.log("Connected to database");  
// });  

app.post("/register",async(req,res)=>{
 try{
    const{name,email,password}=req.body;
    const registrattionData=new Registartion({
        name,
        email,
        password
    })
    await registrattionData.save();
    res.redirect("/success.html");
}
catch(error){
    console.log(error);
    res.redirect("/error.html");

}
})
app.get("/success",(req,res)=>{
    res.sendFile(__dirname="/Pages/success.html");
})
app.get("/error",(req,res)=>{
    res.sendFile(__dirname="/Pages/error.html");
})

app.listen(port, () => {  
    console.log(`Server is running on port ${port}`);  
});
