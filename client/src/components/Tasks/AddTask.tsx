import { useState } from "react"
import ReactDOM from "react-dom"
import styles from "./AddTask.module.css"

import addIcon from "../../assets/icons/add.png"
import Backdrop from "../Modals/Backdrop"
import Modal from "../Modals/Modal"
import TaskForm from "../Forms/TaskForm"

export default function AddTask(){
  const [showModal,setShowModal] = useState(false)

  return (
    <>
      {showModal && ReactDOM.createPortal(<>
        <Backdrop closeModal={()=>setShowModal(false)}/>
        <Modal closeModal={()=>setShowModal(false)} extraStyle={{width: "30%"}}>
          <h3 className={styles.title}>Adicionar uma tarefa</h3>
          <TaskForm closeModal={()=>setShowModal(false)}/>
        </Modal>
        </>,document.getElementById("modal-root") as HTMLElement)}
      <div className={styles.container}>
        <button className={styles.button} onClick={()=>setShowModal(true)}><img className={styles.icon} src={addIcon} alt="Add" width="20px"/>Adicionar nova tarefa</button>
      </div>
    </>
  )
}