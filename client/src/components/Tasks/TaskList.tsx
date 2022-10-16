import { useEffect, useState,useCallback } from "react";
import { TaskType } from "../../helpers/typeDefs";
import LoadingSpinner from "../LoadingSpinner";
import SingleTask from "./SingleTask";
import styles from "./TaskList.module.css"

type PropsType = {
  targetDate: string | [string,string]
  targetSearchTitle: string
  targetSearchTags: string[]
}

export default function TaskList({targetDate,targetSearchTitle,targetSearchTags}:PropsType){
  const [tasks,setTasks] = useState<TaskType[]>([])
  const [isLoading,setIsLoading] = useState(false)

  const fetchData = useCallback(async ()=>{
    setIsLoading(true)
    const response = await fetch("/api/tasks",{
      method: "POST",
      body: JSON.stringify({targetDate,targetSearchTitle,targetSearchTags}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setTasks(data)
    setIsLoading(false)
  },[targetDate,targetSearchTitle,targetSearchTags])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  return (
    <ul className={styles.container}>
      {isLoading && <LoadingSpinner/>}
      {tasks.map(task=><SingleTask key={task.id} task={task}/>)}
      {!isLoading && tasks.length === 0 && <span className={styles.notFound}>Nenhuma tarefa foi encontrada. Adicione uma.</span>}
    </ul>
  )
}