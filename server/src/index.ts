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

const TASK_LIST:TaskType[] = [
  {
    id: "123",
    title: "Desenvolver tal coisa",
    description: "Atualizr acoisas akmdao aoskd",
    startTime: "08:30",
    endTime: "09:30",
    date: "10/10/2022"
  },
  {
    id: "133",
    title: "Desenvolver aplicativo ate segunda",
    description: "Precisa terminar a tempo",
    startTime: "12:00",
    endTime: "13:30",
    date: "12/10/2022"
  },
  {
    id: "1113",
    title: "Desenvolver site",
    description: "Sim site bonito",
    startTime: "10:00",
    endTime: "12:30",
    date: "12/10/2022"
  },
  {
    id: "12113",
    title: "Desenvolver site",
    description: "Sim site bonito",
    startTime: "15:00",
    endTime: "15:30",
    date: "12/10/2022"
  },
  {
    id: "11131",
    title: "Desenvolver site",
    description: "Sim site bonito",
    startTime: "13:00",
    endTime: "14:30",
    date: "11/10/2022"
  }
]

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
  const orderedTasks = TASK_LIST.sort((a,b)=>{
    if(a.date > b.date || (a.date === b.date && a.startTime > b.startTime)){ return 1 }
    else{ return -1}
  })
  
  res.json(orderedTasks)
})

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`)
})