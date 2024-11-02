const mongoose=require("mongoose")
const CollegeSchema=mongoose.Schema({
    course_id:{
        type: mongoose.Schema.Types.ObjectId, // This creates a reference to the Student model
        ref: 'Course', // Reference the Student model
        required: true // Make sure each course is linked to a student
    },
    name:{
        type:String,
        minlength:3,
        required:true
    }
})

const College=new mongoose.model("College",CollegeSchema)
module.exports=College