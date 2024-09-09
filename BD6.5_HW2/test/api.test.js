const request = require("supertest");
const http = require("http");
let {app, validateEmployee, validateCompany} = require("../index.js");

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

// Exercise 3: Test Add a new employee with Valid Input
describe("API Endpoints to add data", () => {
  it("should add a new employee with valid input", async () => {
    const res = await request(server)
      .post("/api/employees")
      .send({
        name: 'John Doe',
        companyId: 1
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      companyId: 1
    });
  });

  //Exercise 4: Test add a new employee with invalid input
  it("to verify that the POST /api/employees endpoint returns a 400 status code", async () => {
    const result = await request(server).post("/api/employees").send({
      name: 'John Doe'
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("The company ID is required & should be a string");
  });

  // Exercise 5: Test add a new Company with valid input
  it("should add a new Company with valid input", async () => {
    const res = await request(server)
      .post("/api/companies")
      .send({
        name: 'TechCorp'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: 'TechCorp'
    });
  });
  //Exercise 6: Test add a new Company with invalid input
  it("verify that the POST /api/companies endpoint returns a 400 status code when provided with invalid input", async () => {
    const result = await request(server).post("/api/companies").send({
      name: 2,
    });
    expect(result.statusCode).toEqual(400);
    expect(result.text).toEqual("The name should be a string and is required");
});
});

describe("validation functions", () => {
  //Exercise 7: Test Employee Validation Function with Jest Mocks
  it("should validate the employee input correctly", () => {
    expect(validateEmployee({    name: 'John Doe',
    companyId: 1 })).toBeNull();
    //Exercise 8: Test Employee Validation Function Error Handling with Jest Mocks
    expect(validateEmployee({  name: 'John Doe' })).toEqual(
      "The company ID is required & should be a string",
    );
    expect(validateEmployee({ companyId: 1 })).toEqual(
      "The Employee Name is required & should be a string",
    );
  });

 // Exercise 9: Test Company Validation Function with Jest Mocks
  it("should validate company input correctly", () => {
    expect(
      validateCompany({
        id: 1,
        name: 'TechCorp'
      }),
    ).toBeNull();
   // Exercise 10: Test Company Validation Function Error Handling with Jest Mocks
    expect(validateCompany({  name: 1 })).toEqual(
      "The name should be a string and is required",
    );
   
  });
});
