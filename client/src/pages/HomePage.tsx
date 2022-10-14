import { useState,useCallback } from "react"
import TaskCalendar from "../components/Calendar/TaskCalendar"
import AddTask from "../components/Tasks/Actions/AddTask"
import TaskList from "../components/Tasks/TaskList"

import styles from "./HomePage.module.css"

export default function HomePage(){ 
  const [targetDate,setTargetDate] = useState<string | [string,string]>(new Date().toLocaleString().slice(0,10))

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <AddTask/>
        <TaskList targetDate={targetDate}/>
      </section>
      <section className={styles.sidebar}>
        <TaskCalendar updateTargetDate={useCallback((date:Date | [Date,Date])=>{
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