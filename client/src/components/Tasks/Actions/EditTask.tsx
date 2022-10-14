import { useState } from "react"
import ReactDOM from "react-dom"
import editIcon from "../../../assets/icons/edit.png"
import { TaskType } from "../../../helpers/typeDefs"
import TaskForm from "../../Forms/TaskForm"
import Backdrop from "../../Modals/Backdrop"
import Modal from "../../Modals/Modal"

import styles from "./EditTask.module.css"

type PropsType = {
  task: TaskType
}

export default function EditTaskAction({task}:PropsType){
  const [showModal,setShowModal] = useState(false)

  return (
    <>
      {showModal && ReactDOM.createPortal(<>
        <Backdrop closeModal={()=>setShowModal(false)} extraStyle={{zIndex:7}}/>
        <Modal closeModal={()=>setShowModal(false)} extraStyle={{width: "30%",zIndex:8}}>
          <h3 className={styles.title}>Editar tarefa</h3>
          <TaskForm closeModal={()=>setShowModal(false)} defaultData={task}/>
        </Modal>
      </>,document.getElementById("modal-root") as HTMLElement)}
      <button className={styles.button} onClick={()=>{setShowModal(true)}}><img src={editIcon} alt="Edit" width="25px"/></button>
    </>
  )
}