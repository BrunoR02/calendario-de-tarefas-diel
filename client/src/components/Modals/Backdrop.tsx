import styles from "./Backdrop.module.css"

type PropsType = {
  closeModal: ()=>void
  extraStyle?: React.CSSProperties
}

export default function Backdrop({closeModal,extraStyle}:PropsType){
  return <div className={styles.backdrop} style={extraStyle} onClick={closeModal}></div>
}