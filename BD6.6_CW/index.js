let cors = require("cors")
app.use(cors())
app.use(express.json())
let express = require("express")
let app = express()
const {getAllEmployees, getEmployeesByID}=require("./controllers")

//get all employees 
app.get("/employees", async(req,res)=>{
  const employees = getAllEmployees()
  res.json({employees})
})

//get employees by ID 
app.get("/employees/details/:id", async(req,res)=>{
  let employee = getEmployeesByID(parseInt(req.params.id))
  res.json({employee})
})

module.exports={app}