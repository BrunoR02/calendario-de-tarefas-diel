import { useState,useCallback } from "react"
import TaskCalendar from "../components/Calendar/TaskCalendar"
import SearchTitle from "../components/Search/SearchTitle"
import AddTask from "../components/Tasks/Actions/AddTask"
import TaskList from "../components/Tasks/TaskList"

import styles from "./HomePage.module.css"

export default function HomePage(){ 
  const [targetDate,setTargetDate] = useState<string | [string,string]>(new Date().toLocaleString().slice(0,10))
  const [targetSearch,setTargetSearch] = useState("")

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <SearchTitle setTargetSearch={(value:string)=>setTargetSearch(value)}/>
        <AddTask/>
        <TaskList targetDate={targetDate} targetSearch={targetSearch}/>
      </section>
      <section className={styles.sidebar}>
        <TaskCalendar setTargetDate={useCallback((date:Date | [Date,Date])=>{
          if(Array.isArray(date)){
            setTargetDate([date[0].toLocaleString().slice(0,10),date[1].toLocaleString().slice(0,10)])
          } else {
            setTargetDate(date.toLocaleString().slice(0,10))
          }
          },[])}/>
      </section>
    </div>
  )
}