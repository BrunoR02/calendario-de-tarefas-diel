import express from "express"
const app = express()

const PORT = process.env.PORT || 3001

app.get("/",(req,res)=>{7
  res.send("Funcionando")
})

app.listen(PORT,()=>{
  console.log(`Server running on ${PORT}`)
})