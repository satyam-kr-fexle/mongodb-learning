const express=require("express")
const { createStudent, getStudents } = require("../controller/student.controller")
const Router=express.Router()

Router.route("/").post(createStudent)
Router.route("/").get(getStudents)

module.exports=Router