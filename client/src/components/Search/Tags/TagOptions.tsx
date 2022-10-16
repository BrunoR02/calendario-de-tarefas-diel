import { ChangeEvent} from "react"
import styles from "./TagOptions.module.css"

type PropsType = {
  tagList: string[]
  activeTags: string[]
  setActiveTags: (tags:string[]) => void
}

export default function TagOptions({tagList,activeTags,setActiveTags}:PropsType){

  return (
    <ul className={styles.tags}>
      {tagList.map(tag=>{
        return (
        <li key={tag} className={styles.tagItem}>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" value={tag} 
              checked={activeTags.some(activeTag=>activeTag === tag)} 
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                  if(e.target.checked) setActiveTags([...activeTags,tag]) 
                  else setActiveTags(activeTags.filter(activeTag=>activeTag!==tag))
                }
              }/>
            {tag}
          </label>
        </li>
        )
      })}
    </ul>
  )
}