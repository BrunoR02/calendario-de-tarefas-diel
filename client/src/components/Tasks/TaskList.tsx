import { useEffect, useState,useCallback } from "react";
import { TaskType } from "../../helpers/typeDefs";
import LoadingSpinner from "../LoadingSpinner";
import SingleTask from "./SingleTask";
import styles from "./TaskList.module.css"

type PropsType = {
  targetDate: string | [string,string]
}

export default function TaskList({targetDate}:PropsType){
  const [tasks,setTasks] = useState<TaskType[]>([])
  const [isLoading,setIsLoading] = useState(false)

  const fetchData = useCallback(async ()=>{
    setIsLoading(true)
    const response = await fetch("/api/tasks",{
      method: "POST",
      body: JSON.stringify({targetDate}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setTasks(data)
    setIsLoading(false)
  },[targetDate])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  return (
    <ul className={styles.container}>
      {isLoading && <LoadingSpinner/>}
      {tasks.map(task=><SingleTask key={task.id} task={task}/>)}
      {!isLoading && tasks.length === 0 && <span className={styles.notFound}>Não existe nenhuma tarefa cadastrada. Adicione uma.</span>}
    </ul>
  )
}