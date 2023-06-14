require('dotenv').config()
const {mongo_connect,studentsData}=require("./src/db")
const path = require("path");
const express=require("express")
const mongoose=require("mongoose")
const hbs = require("hbs");
const app=express()
const PORT=process.env.PORT || 9000

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));
hbs.registerPartials(path.join(__dirname, "./templates/partials"));
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/forStudents", (req, res) => {
  res.render("forStudents");
});
app.post("/forStudents", async (req, res) => {
  if (req.body.DIV && req.body.ROLL_NO) {
     await studentsData.findOne({
      ROLL_NO: parseInt(req.body.ROLL_NO),
      DIV: req.body.DIV,
    }).then( async(studentdatajson)=>{

   await studentsData.find({ DIV:req.body.DIV }).sort({ RANK: 1 }).then((data) => {
      var class_rank = 0;

      for (i = 0; i < data.length; i++) {
        if (data[i].ROLL_NO === parseInt(req.body.ROLL_NO)) {
          class_rank = i + 1;
        }
      }
      studentdatajson["class_rank"] = class_rank;

      res.render("forStudents", studentdatajson);
    })}).catch((err)=>{if(err){res.render("err",{err:"MONGO_DB be like:",src:"./images/whoareyou.gif"})}})
  } else {
    res.render("err",{src:"./images/really.gif"});
  }
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contactUs", (req, res) => {
  res.render("contactUs");
});
app.get("/courses", (req, res) => {
  res.render("courses");
});
app.get("/engineering", (req, res) => {
  res.render("engineering");
});
app.get("/law", (req, res) => {
  res.render("law");
});
app.get("/polytechinique", (req, res) => {
  res.render("polytechinique");
});
app.get("/architecture", (req, res) => {
  res.render("architecture");
});
app.get("/management", (req, res) => {
  res.render("management");
});
app.get("/computer_applications", (req, res) => {
  res.render("computer_applications");
});
app.get("/pharmacy", (req, res) => {
  res.render("pharmacy");
});
app.get("/commerce", (req, res) => {
  res.render("commerce");
});
app.get("/developers", (req, res) => {
  res.render("developers");
});
app.get("/mongodata", (req, res) => {
  res.render("mongodata");
});
app.get("*", (req, res) => {
  res.render("err",{src:"./images/really.gif"});
});

const start=async (uri)=>{
  try {
    await mongo_connect(uri).then((err)=>{console.log("connected to rank Data")})
    app.listen(PORT,(err)=>
{
    if(err)
    {
        console.log(`failed connecting to port ${PORT} : ${err}`)
    }
    else{
        console.log(`successfully connected to port ${PORT}`)

    }
})
  } catch (error) {
    console.log(err)
    
  }

}