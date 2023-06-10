require('dotenv').config()
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URI).then(()=>
{
    console.log("connected to the rankData")
}).catch((err)=>
{
    console.log(`error while connecting to the rankData the error is :-${err}`)
})

const studentsData=new mongoose.model("t1",new mongoose.Schema({
    
        DEPARTMENT: String,
        BRANCH: String,
        ROLL_NO: Number,
        ENROLL_NO: Number,
        DIV: String,
        STUDENT_NAME:String,
        MENTOR: String,
        FSD2_T1: Number,
        DM_T1: Number,
        COA_T1: Number,
        FCSP2_T1: Number,
        TOC_T1: Number,
        TOTAL_T1: Number,
        RANK: Number
      
}))
module.exports=studentsData
// var data=async()=>
// {
//     var b=await studentData.find({DIV:"C1"}).sort({RANK:1})
   
//     return b
// }
// var c=data()
// c.then((data)=>
// {
//    console.log(data[5])
//     for(i=0;i<data.length;i++)
//     {
//         if(data[i].STUDENT_NAME=="KADAM RUSHIGANA MAHESHKUMAR")
//         {
//             console.log(i+1)
//         }
//     }
// })