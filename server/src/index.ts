import express from "express"
const app = express()

const PORT = process.env.PORT || 3001

type TaskType = {
  title: string
  description: string
  startTime: string
  endTime: string
  date: string
}

const TASK_LIST:TaskType[] = []

app.get("/api",(req,res)=>{
  res.send("Funcionando")
})

app.post("/api/task",(req,res)=>{
  const task:TaskType = req.body
  if(!task){
    res.sendStatus(400)
  } else {
    TASK_LIST.push(task)
    res.status(201)
  }
})

app.get("/api/task",(req,res)=>{
  res.json(TASK_LIST)
})

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`)
})