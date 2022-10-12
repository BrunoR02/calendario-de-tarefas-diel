import ReactDOM from "react-dom"
import Modal from "../Modals/Modal"
import styles from "./TaskDetails.module.css"
import TaskActions from "./TaskActions"
import Backdrop from "../Modals/Backdrop"

type PropsType = {
  taskData: {
    title: string
    date: string
    time: string
    description: string
  }
  closeModal: ()=>void
}

export default function TaskDetails({taskData,closeModal}:PropsType){

  return (
    <>
    {ReactDOM.createPortal(<>
        <Backdrop closeModal={closeModal}/>
        <Modal closeModal={closeModal}>
          <section className={styles.header}>
            <h3 className={styles.title}>{taskData.title}</h3>
            <span className={styles.date}>{taskData.date}</span>
            <span className={styles.duration}>{taskData.time}</span>
          </section>
          <section className={styles.footer}>
            <h4 className={styles.subTitle}>Descrição</h4>
            <p className={styles.description}>{taskData.description}</p>
            <TaskActions/>
          </section>
        </Modal>
      </>,document.getElementById("modal-root") as HTMLElement)}
    </>
    
  )
}
