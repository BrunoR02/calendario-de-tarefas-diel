import styles from "./AddTask.module.css"

import addIcon from "../../assets/icons/add.png"

export default function AddTask(){
  return <div className={styles.container}>
    <button className={styles.button}><img className={styles.icon} src={addIcon} alt="Add" width="20px"/>Adicionar nova tarefa</button>
  </div>
}