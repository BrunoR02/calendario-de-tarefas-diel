import styles from "./Backdrop.module.css"

type PropsType = {
  closeModal: ()=>void
}

export default function Backdrop({closeModal}:PropsType){
  return <div className={styles.backdrop} onClick={closeModal}></div>
}