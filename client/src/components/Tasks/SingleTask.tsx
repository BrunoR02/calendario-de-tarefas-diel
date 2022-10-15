import { useState } from "react"
import TaskDetails from "./TaskDetails"
import styles from "./SingleTask.module.css"
import { TaskType } from "../../helpers/typeDefs"

type PropsType = {
  task: TaskType
}

export default function SingleTask({task}:PropsType){
  const [showDetails,setShowDetails] = useState(false)

  return (
    <>
      {showDetails && <TaskDetails task={task} closeModal={()=>setShowDetails(false)}/>}
      <div onClick={()=>setShowDetails(true)} className={styles.task}>
        <h3 className={styles.title}>{task.title}</h3>
        <section className={styles.footer}>
          <div className={styles.details}>
            <span className={styles.date}>{task.date}</span>
            <span className={styles.duration}>{task.startTime + " - " + task.endTime}</span>
          </div>
          {task.holiday && <span className={styles.holiday}>Feriado: {task.holiday}</span>}
        </section>
      </div>
    </>
  )
}