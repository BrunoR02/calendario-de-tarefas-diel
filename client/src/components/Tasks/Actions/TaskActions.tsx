import styles from "./TaskActions.module.css"

import EditTask from "./EditTask"
import { TaskType } from "../../../helpers/typeDefs"
import DeleteTask from "./DeleteTask"

type PropsType = {
  task: TaskType
}

export default function TaskActions({task}:PropsType){

  return (
    <div className={styles.actions}>
      <EditTask task={task}/>
      <DeleteTask taskId={task.id}/>
    </div>
  )
}