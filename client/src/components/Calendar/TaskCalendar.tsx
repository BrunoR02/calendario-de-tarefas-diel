import { useState, useEffect, ChangeEvent} from "react"
import Calendar from "react-calendar"

import 'react-calendar/dist/Calendar.css'
import styles from "./TaskCalendar.module.css"

type PropsType = {
  updateTargetDate: (date:Date | [Date,Date])=>void
}

export default function TaskCalendar({updateTargetDate}:PropsType){
  const [date,setDate] = useState<Date | [Date, Date]>(new Date())
  const [oldDate,setOldDate] = useState(new Date())
  const [selectValue,setSelectValue] = useState<string>("")

  function changeToWeekSelection(){
    const dayOfWeek = oldDate.getDay() * 86400000
    const startRange = new Date(oldDate.getTime() - dayOfWeek)
    startRange.setHours(0,0,0,0)
    const endOfWeek = (7 - oldDate.getDay() - 1) * 86400000
    const endRange = new Date(oldDate.getTime() + endOfWeek)
    endRange.setHours(23,59,59,999)
    const weekRange:[Date,Date] = [startRange,endRange]
    setDate(weekRange)
  }

  function changeToMonthSelection(){
    const dayOfMonth = (oldDate.getDate() -1) * 86400000
    const startRange = new Date(oldDate.getTime() - dayOfMonth)
    startRange.setHours(0,0,0,0)
    const endOfMonth = new Date(oldDate.getFullYear(),oldDate.getMonth() + 1, 0).getDate() * 86400000
    const endRange = new Date(startRange.getTime() + endOfMonth - 86400000)
    endRange.setHours(23,59,59,999)
    const monthRange:[Date,Date] = [startRange,endRange]
    setDate(monthRange)
  }

  function selectChangeHandler(e:ChangeEvent<HTMLSelectElement>){
    const value = e.target.value
    setSelectValue(value)
    switch(value){
      case "day":
        if(Array.isArray(date)) setDate(oldDate)
        break
      case "week":
        changeToWeekSelection()
        break
      case "month":
        changeToMonthSelection()
        break
    }
  }

  useEffect(()=>{
    if(!Array.isArray(date)){
      setSelectValue("day")
      setOldDate(date as Date)
    }
    updateTargetDate(date)
  },[date,updateTargetDate])

  return(
    <>
      <select value={selectValue} className={styles.select} onChange={selectChangeHandler}>
        <option value="day">Dia</option>
        <option value="week">Semana</option>
        <option value="month">Mês</option>
      </select>
      <Calendar locale="pt-BR" onChange={setDate} value={date}/>
    </>
  )
}