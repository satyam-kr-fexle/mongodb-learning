const express=require("express")
const Router=express.Router()
const StudentRouter=require("./student.router")
Router.use("/student",StudentRouter)
module.exports=Router