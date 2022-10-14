import {ChangeEvent, FormEvent, useState} from "react"

import styles from "./SearchTitle.module.css"
import searchIcon from "../../assets/icons/search.png"

type PropsType = {
  setTargetSearch: (value:string)=>void
}

export default function Search({setTargetSearch}:PropsType){
  const [inputValue,setInputValue] = useState("")

  function submitHandler(e:FormEvent){
    e.preventDefault()

    const value = inputValue.trim()

    setTargetSearch(value)
  }


  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input className={styles.input} value={inputValue} onChange={(e:ChangeEvent<HTMLInputElement>)=>setInputValue(e.target.value)}/>
      <button className={styles.button} type="submit"><img src={searchIcon} width="30px" alt="search"/></button>
    </form>
  )
}