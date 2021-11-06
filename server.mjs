import express from 'express';
import morgan from 'morgan';
import cors from "cors";
const app=express()

const port= process.env.PORT || 3000

let users=[];
app.use(cors())
app.use(express.json())
app.use (morgan ('short'))

app.use ((req,res,next)=>{
    console.log("a request came",req.body);
    next()
})
app.get('/users',(req,res)=>{
    res.send(users)
})
app.get('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        res.send(users[req.params.id])
    }
    else{
        res.send("user not found")
    }
})
app.post('/user',(req,res)=>{
    if(!req.body.student_name || !req.body.father_name || !req.body.rollno){
        res.status(400).send("Invalid data")
    } else{
        users.push({
                student_name : req.body.student_name, 
            father_name: req.body.father_name,
            rollno : req.body.rollno
        })
        res.send("users created")
    }
})
app.put('/user/:id',(req,res)=>{
    if(users[req.params.id]){
        if(req.body.student_name){
            users[req.params.id].student_name=req.body.student_name
        } 
        if(req.body.father_name){
            users[req.params.id].father_name=req.body.father_name
        }
            if(req.body.rollno){
                users[req.params.id].rollno=req.body.rollno
            }
            res.send(users[req.params.id])
        }
            else{
                res.send("user not found")
            }
})

app.delete('user/:id',(req,res)=>{
    if(users[req.params.id]){

        users[req.params.id]={};
            res.send("user deleted");

    }else{
        res.send("user not found");
}
})
app.get('/home',(req,res)=>{
    res.send("here is your home")

})
app.get('/',(req,res)=>{
    res.send("Hi I am a hello world server")

})
app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})


