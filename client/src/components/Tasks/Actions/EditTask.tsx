import { useState } from "react"
import ReactDOM from "react-dom"
import editIcon from "../../../assets/icons/edit.png"
import { TaskType } from "../../../helpers/typeDefs"
import TaskForm from "../../Forms/TaskForm"
import Backdrop from "../../Modals/Backdrop"
import Modal from "../../Modals/Modal"

import action_styles from "../TaskActions.module.css"

type PropsType = {
  task: TaskType
}

export default function EditTaskAction({task}:PropsType){
  const [showModal,setShowModal] = useState(false)

  return (
    <>
      {showModal && ReactDOM.createPortal(<>
        <Backdrop closeModal={()=>setShowModal(false)}/>
        <Modal closeModal={()=>setShowModal(false)} extraStyle={{width: "30%"}}>
          <h3 className={action_styles.title}>Editar tarefa</h3>
          <TaskForm closeModal={()=>setShowModal(false)} defaultData={task}/>
        </Modal>
      </>,document.getElementById("modal-root") as HTMLElement)}
      <button className={action_styles.button} onClick={()=>{setShowModal(true)}}><img src={editIcon} alt="Edit" width="25px"/></button>
    </>
  )
}