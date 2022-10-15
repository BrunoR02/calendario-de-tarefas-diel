import styles from "./TagInput.module.css"

import closeIcon from "../../../assets/icons/close.png"
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"

type PropsType = {
  updateTags: (tags:string[])=>void
  initialTags: string[]
  tagsHasError: boolean
  setTagsHasError: (error:boolean)=>void
}

export default function TagInput({updateTags,initialTags,tagsHasError,setTagsHasError}:PropsType){
  const [tagList,setTagList] = useState<string[]>(initialTags)
  const [oldTagList,setOldTagList] = useState<string[]>([])
  const [inputValue,setInputValue] = useState("")

  function addTagHandler(e:KeyboardEvent<HTMLInputElement>){
    if(e.key !== "Enter") return
    //Previnir de mandar Submit pro form ao clicar Enter.
    else e.preventDefault()
    //Evitar tag vazia.
    if(inputValue.trim() === "") return
    //Não adicionar se a tag já existir na lista.
    if(tagList.some(tag=>tag===inputValue)) return 
    setTagList(prevList=>[...prevList,inputValue])
    setInputValue("")
  }

  useEffect(()=>{
    setTagsHasError(tagList.length > 6)
    if(tagList.length !== oldTagList.length){
      if(!(tagList.length > 6)) updateTags(tagList)
      setOldTagList(tagList)
    }
  },[tagList,oldTagList,updateTags,tagsHasError,setTagsHasError])



  return(
    <>
      <label className={styles.label}>Tags</label>
      <div className={styles.formControl + " " + (tagsHasError && styles.error)}>
        {tagList.map(tag=>{
          return (
            <div key={tag} className={styles.tagItem}>
              <span className={styles.tagName}>{tag}</span>
              <span className={styles.close} onClick={()=>{setTagList(prevList=>prevList.filter(item=>item!==tag))}}><img className={styles.closeIcon} src={closeIcon} alt="close" width="8px"/></span>
            </div>
          )
        })}
        <input className={styles.input} type="text" value={inputValue} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setInputValue(e.target.value)}} onKeyDown={addTagHandler} placeholder="Digite aqui..."/>
      </div>
      {tagsHasError && <span className={styles.errorMessage}>Limite de tags atingido (Máximo 6)</span>}
    </>
  )
}