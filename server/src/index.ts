import express from "express"
import cors from "cors"
import capitalizeFirstLetters from "./helpers/capitalizeFirstLetters"
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

let TASK_LIST:TaskType[] = [
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

app.put("/api/task",(req,res)=>{
  const task:TaskType = req.body
  if(!task){
    res.sendStatus(400)
  } else {
    const list = TASK_LIST.map(item=>{
      if(item.id === task.id){
        return task
      }
      return item
    })

    TASK_LIST = list

    res.sendStatus(201)
  }
})

app.delete("/api/task",(req,res)=>{
  const task = req.body
  if(!task){
    res.sendStatus(400)
  } else {
    const list = TASK_LIST.filter(item=>item.id!==task.id)
  
    TASK_LIST = list

    res.sendStatus(200)
  }
})

app.post("/api/tasks",(req,res)=>{
  const {targetDate,targetSearch} = req.body
  if(!targetDate && !targetSearch){
    res.sendStatus(400)
  } else {
    const orderedTasks = TASK_LIST.sort((a,b)=>{
      if(a.date > b.date || (a.date === b.date && a.startTime > b.startTime)){ return 1 }
      else{ return -1}
    })

    let searchedTasks = orderedTasks
    if(targetSearch !== ""){
      searchedTasks = orderedTasks.filter(task=>{
        return task.title.includes(capitalizeFirstLetters(targetSearch))  || task.title.toLowerCase().includes(targetSearch) || capitalizeFirstLetters(task.title).includes(capitalizeFirstLetters(targetSearch))
      })
    }

    const responseTasks = searchedTasks.filter(task=>{
      if(Array.isArray(targetDate)){
        return task.date >= targetDate[0] && task.date <= targetDate[1]
      } else {
        return task.date === targetDate
      }
    })
    
    res.json(responseTasks)
  }
})

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`)
})