
let express = require("express")
let app = express()
let cors = require("cors")
app.use(cors())
app.use(express.json())
const {getAllEmployees, getEmployeesByID}=require("./controllers")

//get all employees 
app.get("/employees", async(req,res)=>{
  const employees = await getAllEmployees()
  res.json({employees})
})

//get employees by ID 
app.get("/employees/details/:id", async(req,res)=>{
  let employee = await getEmployeesByID(parseInt(req.params.id))
  res.json({employee})
})

module.exports={app}