export default function convertDate(date:string,to:"locale" | "readable"){
  if(to==="readable"){
      const dateArray = date.split("-")
      const [year,month,day] = [dateArray[0],dateArray[1],dateArray[2]]
      const formatedDate = day + "/" + month + "/" + year
      return formatedDate
  } else if(to==="locale"){
      const dateArray = date.split("/")
      const [day,month,year] = [dateArray[0],dateArray[1],dateArray[2]]
      const formatedDate = year + "-" + month + "-" + day
      return formatedDate
  } 
  return date
}