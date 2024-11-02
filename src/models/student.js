const mongoose=require("mongoose")
const StudentSchema=mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        required:true
    },
    email:{
        type:String
    },
    roll:{
        type:Number
    },
    className:{
        type:Number
    }
})

const Student=new mongoose.model("Student",StudentSchema)
module.exports=Student