
//For postman:
//https://newsapi.org/v2/top-headlines?country=au&pageSize=3&apiKey=9ddabaee02ec4300a0ebad8bd8929862&totalResults=3
//first three newest api from au news searching
//https://newsapi.org/v2/top-headlines?country=au&category=technology&q=Apple&sortBy=relevancy&apiKey=9ddabaee02ec4300a0ebad8bd8929862
//australia apple about technology news searching 
//web:https://newsapi.org/

const express = require('express');
const app = express();
const port=3000;
const tasks = [];
let id =0;

function cors(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
}

app.use(express.json());
app.use(cors);

app.get('/tasks', (req,res)=>{
    res.json(tasks);
    res.end;
})
// get id
app.get('/tasks/:id',(req,res)=>{
    const {id} = req.params;
    const task = tasks.find(i => i.id=== Number(id));
    if(!task){
        return res.status(404).json({error: "task not found"});
    }
    return res.send(task);
})

// update
app.put('/tasks/:id',(req,res)=>{
    const {id} = req.params;
    const {description, done} = req.body;

    const task = tasks.find(i => i.id=== Number(id));
    if(!task){
        return res.status(404).json({error: "task not found"});
    }

    if(done !== undefined){
        task.done = !!done;
    }

    if(description){
        task.description = "" +task.description;
    }

    return res.json(task);
})
//update
app.post('/tasks',(req,res)=>{
    const {description} = req.body;
    if(!description){
        return res.status(400).json({error:"element is missing"});
    }

    const task = {
        id: ++id,
        description,
        done: false
    }
 
    
    tasks.push(task);
    return res.status(201).json(task);
})

//remove
app.delete('/tasks/:id',(req,res)=>{
    const {id} = req.params;
    const taskIndex = tasks.findIndex(i=>i.id === Number(id));

    if(taskIndex ===-1){
        return res.status(404).json({error: "task not found"});
    }

    tasks.splice(taskIndex,1);
    res.sendStatus(204);
})

app.listen(port,()=>{
    console.log('server is running on 3000');
})

// app.post('/',(req,res)=>{
//     res.send('hello world');
// }
// )

// app.listen(5000);