import { ChangeEvent, FormEvent, useReducer, useState} from "react"
import capitalizeFirstLetters from "../../helpers/capitalizeFirstLetters"
import convertDate from "../../helpers/convertDate"
import { TaskType } from "../../helpers/typeDefs"
import SingleInput from "./Inputs/SingleInput"
import TagInput from "./Inputs/TagInput"
import styles from "./TaskForm.module.css"

interface InputAction {
  type: "title" | "description" | "date" | "startTime" | "endTime" | "tags"
  payload: any
}

type InputStateType = {
  title: string
  description: string
  date: string
  startTime: string
  endTime: string,
  tags: string[]
}

type PropsType = {
  closeModal: () => void
  defaultData?: TaskType
}

function reducer(state:InputStateType,action: InputAction){
  const {type,payload} = action
  switch(type){
    case "title":
      return {...state, title: payload as string}
    case "description":
      return {...state, description: payload as string}
    case "date":
      return {...state, date: payload as string}
    case "startTime":
      return {...state, startTime: payload as string}
    case "endTime":
      return {...state, endTime: payload as string}
    case "tags":
      return {...state, tags: payload as string[]}
    default:
      return state
  }
}

export default function TaskForm({closeModal,defaultData}:PropsType){
  const [input,dispatch] = useReducer(reducer,{
    title: defaultData ? defaultData.title : "",
    description: defaultData ? defaultData.description : "",
    date: defaultData ? convertDate(defaultData.date,"locale") : new Date().toISOString().toLocaleString().slice(0,10),
    startTime: defaultData ? defaultData.startTime : "00:00",
    endTime: defaultData ? defaultData.endTime : "00:00",
    tags: defaultData ? defaultData.tags : []
  })

  const [isDurationDefined,setIsDurationDefined] = useState(false)
  const [tagsHasError,setTagsHasError] = useState(false)

  let [startTime,endTime] = [input.startTime.split(":").map((item:any)=>parseInt(item)),input.endTime.split(":").map((item:any)=>parseInt(item))]
  let isTimeInvalid = (endTime[0] - startTime[0]) < 0 || (endTime[0] === startTime[0] && (endTime[1] - startTime[1]) <= 0)

  async function submitHandler(e:FormEvent){
    e.preventDefault()
    if(!isTimeInvalid && !tagsHasError){
      //Se tem dados já carregados nos inputs, ou seja se o usuário está editando.
      if(defaultData){
        const body = {
          id:defaultData.id,
          ...input,
          date:convertDate(input.date,"readable"),
          tags: input.tags.map(tag=>capitalizeFirstLetters(tag)),
          holiday: null
        }

        const response = await fetch("/api/task",{
          method: "PUT",
          body: JSON.stringify(body),
          headers:{
            "Content-Type": "application/json"
          },
        })
  
        if(response.status === 201){
          window.location.reload()
        }
      } else{
        const id = crypto.randomUUID().slice(0,8)
  
        const body = {
          id,
          ...input,
          date: convertDate(input.date,"readable"),
          tags: input.tags.map(tag=>capitalizeFirstLetters(tag)),
          holiday: null
        }
  
        const response = await fetch("/api/task",{
          method: "POST",
          body: JSON.stringify(body),
          headers:{
            "Content-Type": "application/json"
          },
        })
  
        if(response.status === 201){
          window.location.reload()
        }
      }

    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <SingleInput title="Título" type="text" value={input.title} extraStyle={{width:"80%"}} onChange={(e:ChangeEvent<HTMLInputElement>)=>{dispatch({type:"title",payload:e.target.value})}}/>
      <SingleInput title="Descrição" type="textarea" value={input.description} extraStyle={{width:"80%"}} onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>{dispatch({type:"description",payload:e.target.value})}}/>
      <SingleInput title="Data" type="date" value={input.date} extraStyle={{width:"30%"}} onChange={(e:ChangeEvent<HTMLInputElement>)=>{dispatch({type:"date",payload:e.target.value})}}/>
      <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap",width:"100%"}}>
        <SingleInput title="De" type="time" value={input.startTime} error={isTimeInvalid && isDurationDefined} extraStyle={{width:"25%"}} onChange={(e:ChangeEvent<HTMLInputElement>)=>{dispatch({type:"startTime",payload:e.target.value})}}/>
        <SingleInput title="Até" type="time" value={input.endTime} error={isTimeInvalid && isDurationDefined} extraStyle={{width:"25%"}} onBlur={()=>{setIsDurationDefined(true)}} onChange={(e:ChangeEvent<HTMLInputElement>)=>{dispatch({type:"endTime",payload:e.target.value})}}/>
      </div>
      {isTimeInvalid && isDurationDefined && <span className={styles.errorMessage}>Duração Inválida.</span>}
      <TagInput tagsHasError={tagsHasError} setTagsHasError={(error:boolean)=>setTagsHasError(error)} initialTags={input.tags} updateTags={(tags)=>{dispatch({type:"tags",payload:tags})}}/>
      <div className={styles.actions}>
        <button className={styles.button} type="button" onClick={closeModal}>Cancelar</button>
        <button className={styles.button} type="submit">Salvar</button>
      </div>
    </form>
  )
}