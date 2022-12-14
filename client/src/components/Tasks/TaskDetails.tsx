import ReactDOM from "react-dom"
import Modal from "../Modals/Modal"
import styles from "./TaskDetails.module.css"
import TaskActions from "./Actions/TaskActions"
import Backdrop from "../Modals/Backdrop"
import { TaskType } from "../../helpers/typeDefs"

type PropsType = {
  task: TaskType
  closeModal: ()=>void
}

export default function TaskDetails({task,closeModal}:PropsType){

  return (
    <>
    {ReactDOM.createPortal(<>
        <Backdrop closeModal={closeModal}/>
        <Modal extraClass={styles.modal} closeModal={closeModal}>
          <section className={styles.header}>
            <h3 className={styles.title}>{task.title}</h3>
            <span className={styles.date}>{task.date}</span>
            <span className={styles.duration}>{task.startTime + " - " + task.endTime}</span>
          </section>
          <section className={styles.footer}>
            <h4 className={styles.subTitle}>Descrição</h4>
            <p className={styles.description}>{task.description}</p>
            <ul className={styles.tags}>
              <h4 className={styles.tagsTitle}>Tags:</h4>
              {task.tags.map(tag=>{
                return <li className={styles.tagItem} key={tag}>{tag}</li>
              })}
            </ul>
            <TaskActions task={task}/>
          </section>
        </Modal>
      </>,document.getElementById("modal-root") as HTMLElement)}
    </>
    
  )
}
