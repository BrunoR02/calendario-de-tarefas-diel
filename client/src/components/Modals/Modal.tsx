import styles from "./Modal.module.css"

import closeIcon from "../../assets/icons/close.png"

type PropsType = {
  children: React.ReactNode
  closeModal: () => void
}

export default function Modal({children,closeModal}:PropsType){
  
  return (
    <div className={styles.modal}>
      <button className={styles.close} onClick={closeModal}><img src={closeIcon} alt="Close" width="25px"/></button> 
      {children}
    </div>
  )
}
