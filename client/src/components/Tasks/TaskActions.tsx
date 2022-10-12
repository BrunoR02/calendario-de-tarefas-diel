import styles from "./TaskActions.module.css"

import deleteIcon from "../../assets/icons/delete.png"
import editIcon from "../../assets/icons/edit.png"

export default function TaskActions(){

  return (
    <div className={styles.actions}>
    <button className={styles.button}><img src={editIcon} alt="Edit" width="25px"/></button>
      <button className={styles.button}><img src={deleteIcon} alt="Delete" width="25px"/></button>
    </div>
  )
}