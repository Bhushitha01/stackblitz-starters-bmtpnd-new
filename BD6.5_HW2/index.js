let express = require("express");
let app = express();
app.use(express.json());
let employees = [];

//Exercise 1: Add a New Employee
function validateEmployee(emp) {
  if (!emp.name || typeof emp.name !== "string") {
    return ("The Employee Name is required & should be a string");
  } else if (!emp.companyId || typeof emp.companyId !== "number") {
    return ("The company ID is required & should be a string");
  } else {
    return null;
  }
}
app.post("/api/employees", (req, res) => {
  let error = validateEmployee(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let newAddedEmp= { id: employees.length + 1, ...req.body };
  employees.push(newAddedEmp);
  res.status(201).json(newAddedEmp);
});

let company = [];

//Exercise 2: Add a New Company
function validateCompany(addedComp) {
  if (!addedComp.name || typeof addedComp.name !== "string") {
    return "The name should be a string and is required";
  }
   else {
  return null; 
  }
}
app.post("/api/companies", (req, res) => {
  let error = validateCompany(req.body);
  if (error) {
    res.status(400).send(error);
  }
  let newComp = { id: company.length + 1, ...req.body };
  company.push(newComp);
  res.status(201).json(newComp);
});


module.exports = { app, validateEmployee, validateCompany };
