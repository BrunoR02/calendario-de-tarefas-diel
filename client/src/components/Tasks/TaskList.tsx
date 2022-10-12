import SingleTask from "./SingleTask";
import styles from "./TaskList.module.css"

export default function TaskList(){

  return (
    <ul className={styles.container}>
      <SingleTask/>
      <SingleTask/>
      <SingleTask/>
    </ul>
  )
}