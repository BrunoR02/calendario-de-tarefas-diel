export default function isDateBetweenPeriod(period:[string,string],date:string){
  //Separar strings de data(date) em arrays para poder comparar separadamente o dia, mês e o ano.
  const dateArray = date.split("/")
  const [startPeriodArray,endPeriodArray] = [period[0].split("/"), period[1].split("/")]

  let isDateBetweenPeriod:boolean[] = [false,false,false];
  for(let i=0;i<3;i++){
    isDateBetweenPeriod[i] = (dateArray[i] >= startPeriodArray[i] && dateArray[i] <= endPeriodArray[i])
  }
  

  return isDateBetweenPeriod.reduce((prev,current)=>prev && current,true)
}