const mongoose=require("mongoose")
const CourseSchema=mongoose.Schema({
    student_id:{
        type: mongoose.Schema.Types.ObjectId, // This creates a reference to the Student model
        ref: 'Student', // Reference the Student model
        required: true // Make sure each course is linked to a student
    },
    name:{
        type:String,
        minlength:3,
        required:true
    }
})

const Course=new mongoose.model("Course",CourseSchema)
module.exports=Course