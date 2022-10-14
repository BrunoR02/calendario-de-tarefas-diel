import { useState } from "react"
import ReactDOM from "react-dom"
import deleteIcon from "../../../assets/icons/delete.png"
import Backdrop from "../../Modals/Backdrop"
import Modal from "../../Modals/Modal"

import styles from "./DeleteTask.module.css"

type PropsType = {
  taskId: string
}

export default function DeleteTask({taskId}:PropsType){
  const [showModal,setShowModal] = useState(false)

  async function deleteHandler(){
    const response = await fetch("/api/task",{
      method: "DELETE",
      body: JSON.stringify({id:taskId}),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(response.status === 200){
      window.location.reload()
    }
  }

  return (
    <>
      {showModal && ReactDOM.createPortal(<>
        <Backdrop closeModal={()=>setShowModal(false)} extraStyle={{zIndex:7}}/>
        <Modal closeModal={()=>setShowModal(false)} extraStyle={{width: "30%", zIndex:8}}>
          <h3 className={styles.title}>Você tem certeza que quer apagar essa tarefa?</h3>
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={()=>setShowModal(false)}>Não</button>
            <button className={styles.actionButton} onClick={deleteHandler}>Sim</button>
          </div>
        </Modal>
      </>,document.getElementById("modal-root") as HTMLElement)}
      <button className={styles.button} onClick={()=>{setShowModal(true)}}><img src={deleteIcon} alt="Edit" width="25px"/></button>
    </>
  )
}