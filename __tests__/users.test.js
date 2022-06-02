const request = require("supertest")
const jwt = require("jsonwebtoken")
const { createServer } = require("../utils/serverUtils")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const dotenv = require("dotenv")

const User = require("../models/User")
// to loads environment variables from a .env file
// you can change the path with the property "path" like this
dotenv.config({ path: "./config/config.env" })

const app = createServer()
// it is important if we want to set options like Authorization or cookies, ...
const supertest = request.agent(app)

async function addUser(user) {
  const newUser = await User.create(user)
  return newUser
}

function testLogin(supertest, data) {
  return supertest
    .post("/api/v1/auth/login")
    .send({ email: data.email, password: data.password })
    .expect(200)
    .then((res) => {
      supertest.set("Authorization", `Bearer ${res._body.token}`)
      return res._body.token
    })
}

describe("Users", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()

    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    const data = await addUser({
      name: "test",
      email: "test1000@gmail.com",
      password: "123456",
      role: "admin",
    })
    await testLogin(supertest, { email: data.email, password: "123456" })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  test("should get all users", async () => {
    await supertest
      .get("/api/v1/users")
      // .set("Authorization", `Bearer ${token}`)
      .expect(200)
  })
})
