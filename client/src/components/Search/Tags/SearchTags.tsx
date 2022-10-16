import { useState,useEffect,ChangeEvent } from "react"
import TagOptions from "./TagOptions"

import styles from "./SearchTags.module.css"
import closeIcon from "../../../assets/icons/close.png"
import Backdrop from "../../Modals/Backdrop"
import TagInputSearch from "./TagInputSearch"
import capitalizeFirstLetters from "../../../helpers/capitalizeFirstLetters"

type PropsType = {
  setTargetSearch: (tags:string[])=>void
}

export default function SearchTags({setTargetSearch}:PropsType){
  const [showOptions,setShowOptions] = useState(false)
  const [tagList,setTagList] = useState<string[]>([])
  const [searchTagList,setSearchTagList] = useState<string[]>([])
  const [activeTags,setActiveTags] = useState<string[]>([])
  const [oldActiveTags,setOldActiveTags] = useState<string[]>([])

  const [inputValue,setInputValue] = useState("")

  function searchHandler(){
    if(activeTags !== oldActiveTags){
      setTargetSearch(activeTags)
      setOldActiveTags(activeTags)
    }
    setShowOptions(false)
  }

  useEffect(()=>{
    async function fetchTags(){
      const response = await fetch("/api/tags")
      const {tags} = await response.json()
      setTagList(tags)
      setSearchTagList(tags)
    }
    fetchTags()
  },[])

  useEffect(()=>{
    setSearchTagList(tagList.filter(tag=>{
      return tag.includes(capitalizeFirstLetters(inputValue))  || 
      tag.toLowerCase().includes(inputValue) || 
      capitalizeFirstLetters(tag).includes(capitalizeFirstLetters(inputValue))
    }))
  },[inputValue,tagList])

  console.log(searchTagList)

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={()=>setShowOptions(true)}>Tags</button>
      {showOptions && <>
        <Backdrop extraStyle={{backgroundColor:"#00000055"}} closeModal={()=>setShowOptions(false)}/>
        <div className={styles.modal}>
          <TagInputSearch value={inputValue} setInputValue={(e:ChangeEvent<HTMLInputElement>)=>setInputValue(e.target.value)}/>
          <button className={styles.close} onClick={()=>setShowOptions(false)}><img src={closeIcon} alt="close" width="15px"/></button>
          <TagOptions tagList={searchTagList} activeTags={activeTags} setActiveTags={(tags:string[])=>setActiveTags(tags)} />
          <button className={styles.searchButton} onClick={searchHandler} type="button">Exibir resultados</button>
        </div>
      </>}
    </div>
  )
}