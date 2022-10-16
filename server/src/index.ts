import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import capitalizeFirstLetters from "./helpers/capitalizeFirstLetters"
import isDateBetweenPeriod from "./helpers/isDateBetweenPeriod"
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
  holiday: string | null
  tags: string[]
}

let TASK_LIST:TaskType[] = [
  {
    id: "123",
    title: "Desenvolver tal coisa",
    description: "Atualizr acoisas akmdao aoskd",
    startTime: "08:30",
    endTime: "09:30",
    date: "10/10/2022",
    holiday: null,
    tags: []
  },
  {
    id: "133",
    title: "Desenvolver aplicativo ate segunda",
    description: "Precisa terminar a tempo",
    startTime: "12:00",
    endTime: "13:30",
    date: "13/10/2022",
    holiday: null,
    tags: []
  },
  {
    id: "1113",
    title: "Desenvolver site",
    description: "Sim site bonito",
    startTime: "10:00",
    endTime: "12:30",
    date: "13/10/2022",
    holiday: null,
    tags: []
  },
  {
    id: "12113",
    title: "Desenvolver site",
    description: "Sim site bonito",
    startTime: "15:00",
    endTime: "15:30",
    date: "13/10/2022",
    holiday: null,
    tags: []
  },
  {
    id: "11131",
    title: "Desenvolver site",
    description: "Sim site bonito",
    startTime: "13:00",
    endTime: "14:30",
    date: "11/10/2022",
    holiday: null,
    tags: []
  }
]

let TAG_LIST:string[] = []

app.get("/api",(req,res)=>{
  res.send("Funcionando")
})

app.post("/api/task",async (req,res)=>{
  const task:TaskType = req.body
  if(!task) res.sendStatus(400)
  else {
    const response = await fetch("https://date.nager.at/api/v3/publicholidays/2022/BR")
    const holidays:any = await response.json()
    
    holidays.forEach((item:any)=>{
      const dateArray = item.date.split("-")
      const [year,month,day] = [dateArray[0],dateArray[1],dateArray[2]]
      const formatedDate = day + "/" + month + "/" + year
      if(task.date === formatedDate) task.holiday = item.localName
  })

    TASK_LIST.push(task)
    res.sendStatus(201)
  }
})

app.put("/api/task",async (req,res)=>{
  const task:TaskType = req.body
  if(!task) res.sendStatus(400)
  else {
    const response = await fetch("https://date.nager.at/api/v3/publicholidays/2022/BR")
    const holidays:any = await response.json()
    
    holidays.forEach((item:any)=>{
      const dateArray = item.date.split("-")
      const [year,month,day] = [dateArray[0],dateArray[1],dateArray[2]]
      const formatedDate = day + "/" + month + "/" + year
      if(task.date === formatedDate) task.holiday = item.localName
    })

    const list = TASK_LIST.map(item=>{
      if(item.id === task.id)return task
      return item
    })

    TASK_LIST = list

    res.sendStatus(201)
  }
})

app.delete("/api/task",(req,res)=>{
  const task = req.body
  if(!task) res.sendStatus(400)
  else {
    const list = TASK_LIST.filter(item=>item.id!==task.id)
  
    TASK_LIST = list

    res.sendStatus(200)
  }
})

app.post("/api/tasks",(req,res)=>{
  const {targetDate,targetSearchTitle,targetSearchTags} = req.body
  if(!targetDate && !targetSearchTitle && !targetSearchTags) res.sendStatus(400)
  else {
    const orderedTasks = TASK_LIST.sort((a,b)=>{
      if(a.date > b.date || (a.date === b.date && a.startTime > b.startTime)) return 1 
      else return -1
    })

    //Search by title
    let searchedTitleTasks = orderedTasks
    if(targetSearchTitle !== ""){
      searchedTitleTasks = orderedTasks.filter(task=>{
        return task.title.includes(capitalizeFirstLetters(targetSearchTitle))  || 
        task.title.toLowerCase().includes(targetSearchTitle) || 
        capitalizeFirstLetters(task.title).includes(capitalizeFirstLetters(targetSearchTitle))
      })
    }

    //Search by tags
    let searchedTagsTasks = searchedTitleTasks
    if(targetSearchTags.length !== 0){
      searchedTagsTasks = searchedTitleTasks.filter(task=>{
        return task.tags.some(tag=>targetSearchTags.some((searchTag:string)=>searchTag===tag))
      })
    }

    const responseTasks = searchedTagsTasks.filter(task=>{
      if(Array.isArray(targetDate))return isDateBetweenPeriod(targetDate as [string,string],task.date)
      else return task.date === targetDate
    })
    
    res.json(responseTasks)
  }
})

app.get("/api/tags",(req,res)=>{
  const list:string[] = []
 
  TASK_LIST.forEach(task=>{
    task.tags.forEach(tag=>{
      if(TAG_LIST.length === 0){
        TAG_LIST.push(tag)
        list.push(tag)
      }
      if(!list.some(tagItem=>tagItem===tag)) list.push(tag)
    })
  })

  TAG_LIST = list

  res.json({tags:list})
})

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`)
})