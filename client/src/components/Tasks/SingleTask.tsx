import { useState } from "react"
import TaskDetails from "./TaskDetails"
import styles from "./SingleTask.module.css"

export default function SingleTask(){
  const [showDetails,setShowDetails] = useState(false)

  const DUMMY_TASK = {
    title: "Realizar tarefas relacionado a tal assunto",
    date: "17/10/2022",
    time: "08:15 - 08:48",
    description: "Realizar tarefas da semana passada relacionado a assunto que foi descutido. Acabar logo."
  }
  return (
    <>
      {showDetails && <TaskDetails taskData={DUMMY_TASK} closeModal={()=>setShowDetails(false)}/>}
      <div onClick={()=>setShowDetails(true)} className={styles.task}>
        <h3 className={styles.title}>{DUMMY_TASK.title}</h3>
        <section className={styles.footer}>
          <div className={styles.details}>
            <span className={styles.date}>{DUMMY_TASK.date}</span>
            <span className={styles.duration}>{DUMMY_TASK.time}</span>
          </div>
        </section>
      </div>
    </>
  )
}