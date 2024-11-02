const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://satyamkumar:gz2R9JEynP4TSD1q@satyam.41iuw.mongodb.net/satyam",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Databse Connected...")
}).catch((err)=>{
    console.log(err,">>>>>>>>>>>>")
})