import { ChangeEvent } from "react"
import styles from "./SingleInput.module.css"

type PropsType = {
  title: string
  type: string
  value: string
  extraClass?: string
  error?: boolean
  onChange: (e:ChangeEvent<HTMLInputElement & HTMLTextAreaElement>)=>void
  onBlur?: ()=>void
}

export default function SingleInput({title,type,value,error,extraClass,onChange,onBlur}:PropsType){

  return (
    <div className={styles.formControl + " " + extraClass}>
      <label className={styles.label + " " + (error && styles.errorLabel)} htmlFor={title}>{title} {(type === "textarea") && "(max: 300 caracteres)"}</label>
      {type !== "textarea" && <input required className={styles.input + " " + (error && styles.errorInput)} type={type} name={title} value={value} onBlur={onBlur} onChange={onChange}/>}
      {type === "textarea" && <textarea className={styles.textarea} value={value} onChange={onChange} maxLength={300}/>}
    </div>
  )
}