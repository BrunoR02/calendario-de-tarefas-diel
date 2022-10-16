import {ChangeEvent} from "react"

import styles from "./TagInputSearch.module.css"

type PropsType = {
  value: string
  setInputValue:(e:ChangeEvent<HTMLInputElement>)=>void
}

export default function TagInputSearch({value,setInputValue}:PropsType){

  return (
    <input className={styles.input} type="text" value={value} onChange={setInputValue}/>
  )
}