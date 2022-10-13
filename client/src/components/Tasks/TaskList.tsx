import { useEffect, useState } from "react";
import { TaskType } from "../../helpers/typeDefs";
import LoadingSpinner from "../LoadingSpinner";
import SingleTask from "./SingleTask";
import styles from "./TaskList.module.css"

export default function TaskList(){
  const [tasks,setTasks] = useState<TaskType[]>([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    async function fetchData(){
      setIsLoading(true)
      const response = await fetch("/api/task")
      const data = await response.json()
      setTasks(data)
      setIsLoading(false)
    }
    fetchData()
  },[])

  return (
    <ul className={styles.container}>
      {isLoading && <LoadingSpinner/>}
      {tasks.map(task=><SingleTask key={task.id} task={task}/>)}
      {!isLoading && tasks.length === 0 && <span className={styles.notFound}>Não existe nenhuma tarefa cadastrada. Adicione uma.</span>}
    </ul>
  )
}