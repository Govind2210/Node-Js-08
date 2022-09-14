const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

const userArray = require("./InitialData")

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

const newId = userArray.length+1;


app.get("/api/student" , async(req ,res)=>{
    // fetching all the data 
   try{
    res.json({
        status : 200,
        message : "sucess",
        userArray
    });

   }
   catch(e){
        res.status(404).send(e.message)
   }
})

app.get("/api/student/:id" , async(req ,res)=>{
    // fetching the data of given id 
   try{
    const idx = userArray.findIndex((obj => obj.id == req.params.id))
    res.json({
        status : 200,
        message : "sucess",
        data : userArray[idx]
    })
   }
   catch(e){
        res.status(404).send(e.message)
   }
})

app.post("/api/student" , async(req ,res)=>{
    // add the data in list
    try{
        if(!req.body.name || !req.body.currentClass || req.body.division){
            return res.status(404).json({
                status : "Failed",
                message : "something is missing here! plz check once"
            })
        }
        else{
            userArray.push({
                id : newId++,
                name : req.body.name,
                currentClass : req.body.currentClass,
                division : req.body.division
            })
            res.json({
                status: "success"
            })
        }
    }
    catch(e){
        res.status(404)
        res.send(e.message)
    }
})

app.put("/api/student/:id" , async (req , res)=>{
    // edit the item in the data
try{
    const idx = userArray.findIndex((obj => obj.id == req.params.id))
    if(idx == -1){
        return res.status(400).json({
            status : "Failure" ,
            message : "there is no student here the given id"
        })
    }
    if(req.body.name)
        userArray[idx].name = req.body.name;
    if(req.body.currentClass)
        userArray[idx].currentClass = req.body.currentClass;
    if(req.body.division)
        userArray[idx].division = req.body.division;

    res.json({
        status :  "sucess",
        data : userArray[idx]
    })
}
catch(e){
    res.status(400).json({
        status : "failure",
        message : e.message
    })
}
})

app.delete("/api/student/:id" ,async (req ,res)=>{
    try{
        const idx = userArray.findIndex((obj => obj.id == req.params.id))
        if(idx == -1){
            return res.status(400).json({
                status : "Failure" ,
                message : "there is no student here the given id"
            })
        }
        userArray.slice(idx , 1)
        res.json({
            status :  "sucess",
            message : "Students is deleted sucessfully"
        })
    }
    catch(e){
        res.json({
            status : "Failed" ,
            message : e.message
        })
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   