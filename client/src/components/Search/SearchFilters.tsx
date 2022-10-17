import styles from "./SearchFilters.module.css"
import SearchTags from "./Tags/SearchTags"
import SearchTitle from "./Title/SearchTitle"

type PropsType = {
  setTargetTitle: (value:string)=>void
  setTargetTags: (tags:string[])=>void
}

export default function SearchFilters({setTargetTags,setTargetTitle}:PropsType){
  return (
    <div className={styles.filters}>
      <SearchTitle setTargetSearch={setTargetTitle}/>
      <SearchTags setTargetSearch={setTargetTags}/>
    </div>
  )
}