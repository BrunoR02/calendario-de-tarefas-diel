import { ChangeEvent, FormEvent, useReducer} from "react"
import SingleInput from "./Inputs/SingleInput"
import styles from "./TaskForm.module.css"

interface InputAction {
  type: "title" | "description" | "date" | "startTime" | "endTime"
  payload: string
}

type InputStateType = {
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
}

type PropsType = {
  closeModal: () => void
}

const initialInputState: InputStateType = {
  title: "",
  description: "",
  date: new Date().toISOString().toLocaleString().slice(0,10),
  startTime: "00:00",
  endTime: "00:00"
}

function reducer(state:InputStateType,action: InputAction){
  const {type,payload} = action
  switch(type){
    case "title":
      return {...state, title: payload}
    case "description":
      return {...state, description: payload}
    case "date":
      return {...state, date: payload}
    case "startTime":
      return {...state, startTime: payload}
    case "endTime":
      return {...state, endTime: payload}
    default:
      return state
  }
}

export default function TaskForm({closeModal}:PropsType){
  const [input,dispatch] = useReducer(reducer,initialInputState)

  let isTimeInvalid = false

  let [startTime,endTime] = [input.startTime.split(":").map(item=>parseInt(item)),input.endTime.split(":").map(item=>parseInt(item))]
  if((endTime[0] - startTime[0]) < 0 || (endTime[0] === startTime[0] && (endTime[1] - startTime[1]) <= 0)){
    isTimeInvalid = true
  }

  async function submitHandler(e:FormEvent){
    e.preventDefault()
    if(!isTimeInvalid){
      const id = crypto.randomUUID().slice(0,8)

      const dateArray = input.date.split("-")
      const [year,month,day] = [dateArray[0],dateArray[1],dateArray[2]]
      const formatedDate = day + "/" + month + "/" + year

      const body = {id,...input, date: formatedDate}

      console.log(body)
      const response = await fetch("/api/task",{
        method: "POST",
        body: JSON.stringify(body),
        headers:{
          "Content-Type": "application/json"
        },
      })

      console.log(response)

      if(response.status === 201){
        window.location.reload()
      }

    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <SingleInput title="Título" type="text" value={input.title} extraStyle={{width:"80%"}} onChange={(e:ChangeEvent<HTMLInputElement>)=>{dispatch({type:"title",payload:e.target.value})}}/>
      <SingleInput title="Descrição" type="textarea" value={input.description} extraStyle={{width:"80%"}} onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>{dispatch({type:"description",payload:e.target.value})}}/>
      <SingleInput title="Data" type="date" value={input.date} extraStyle={{width:"30%"}} onChange={(e:ChangeEvent<HTMLInputElement>)=>{dispatch({type:"date",payload:e.target.value})}}/>
      <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap",width:"100%"}}>
        <SingleInput title="De" type="time" value={input.startTime} error={isTimeInvalid} extraStyle={{width:"25%"}} onChange={(e:ChangeEvent<HTMLInputElement>)=>{dispatch({type:"startTime",payload:e.target.value})}}/>
        <SingleInput title="Até" type="time" value={input.endTime} error={isTimeInvalid} extraStyle={{width:"25%"}} onChange={(e:ChangeEvent<HTMLInputElement>)=>{dispatch({type:"endTime",payload:e.target.value})}}/>
      </div>
      {isTimeInvalid && <span className={styles.errorMessage}>Duração Inválida.</span>}
      <div className={styles.actions}>
        <button className={styles.button} type="button" onClick={closeModal}>Cancelar</button>
        <button className={styles.button} type="submit">Salvar</button>
      </div>
    </form>
  )
}