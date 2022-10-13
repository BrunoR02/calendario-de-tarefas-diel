import styles from "./TaskActions.module.css"

import deleteIcon from "../../assets/icons/delete.png"
import EditTask from "./Actions/EditTask"
import { TaskType } from "../../helpers/typeDefs"

type PropsType = {
  task: TaskType
}

export default function TaskActions({task}:PropsType){

  return (
    <div className={styles.actions}>
      <EditTask task={task}/>
      <button className={styles.button}><img src={deleteIcon} alt="Delete" width="25px"/></button>
    </div>
  )
}