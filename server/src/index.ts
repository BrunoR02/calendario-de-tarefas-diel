import express from "express"
import cors from "cors"
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

type TaskType = {
  id: string
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
    res.sendStatus(201)
  }
})

app.get("/api/task",(req,res)=>{
  res.json(TASK_LIST)
})

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`)
})