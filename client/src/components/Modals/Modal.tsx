import styles from "./Modal.module.css"

import closeIcon from "../../assets/icons/close.png"

type PropsType = {
  children: React.ReactNode
  extraClass?: string
  closeModal: () => void
}

export default function Modal({children,extraClass,closeModal}:PropsType){
  
  return (
    <div className={styles.modal + " " + extraClass}>
      <button className={styles.close} onClick={closeModal}><img src={closeIcon} alt="Close" width="20px"/></button> 
      {children}
    </div>
  )
}
