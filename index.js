const express=require("express")
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser")
require('dotenv').config();
require("./src/db/connection")

app.use(bodyParser.json({extended:true}))
app.use(express.json({extended:true}))

app.use(cors())
const Router=require("./src/router/index")
app.use("/api/v1",Router)
app.listen(process.env.PORT,()=>{
    console.log(`Server is listing on PORT ${process.env.PORT}`)
})