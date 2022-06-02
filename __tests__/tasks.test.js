const request = require("supertest")
const { createServer } = require("../utils/serverUtils")
const connectDB = require("../config/db")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const Task = require("../models/Task") // new
const taskId = new mongoose.Types.ObjectId()

const app = createServer()
describe("Tasks", () => {
  jest.setTimeout(10000)
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })
  test("should get all tasks (empty tasks) ", async () => {
    await request(app)
      .get("/api/v1/tasks")
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response._body.model)).toBeTruthy()
        expect(response._body.model.length).toEqual(0)
      })
  })
  test("should add a task", async () => {
    // await Task.deleteMany({
    //   $or: [{ title: "task 1" }, { title: "New title" }],
    // })
    const data = {
      title: "task 1",
      description: "Lorem ipsum",
      duration: 60,
      type: "IT",
    }
    await request(app)
      .post("/api/v1/tasks")
      .send(data) // send the data as body
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response._body.model._id).toBeTruthy()
        expect(response._body.model.title).toBe(data.title)
        expect(response._body.model.description).toBe(data.description)
        expect(response._body.model.duration).toBe(data.duration)
        expect(response._body.model.type).toBe(data.type)
        savedTask = response._body.model
      })
  })

  test("should get all tasks", async () => {
    await request(app)
      .get("/api/v1/tasks")
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response._body.model)).toBeTruthy()
        expect(response._body.model.length).toEqual(1)

        // Check the response data
        expect(response._body.model[0]._id).toBe(savedTask._id)
        expect(response._body.model[0].title).toBe(savedTask.title)
        expect(response._body.model[0].description).toBe(savedTask.description)
      })
  })

  test("should return a single task", async function () {
    await request(app)
      .get("/api/v1/tasks/" + savedTask._id)
      .expect(200)
      .then((response) => {
        expect(response._body.model._id).toBe(savedTask._id)
        expect(response._body.model.title).toBe(savedTask.title)
        expect(response._body.model.description).toBe(savedTask.description)
      })
  })

  test("should update a task", async () => {
    const data = {
      title: "New title",
      description: "dolor sit amet",
    }

    await request(app)
      .put("/api/v1/tasks/" + savedTask._id.toString())
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response._body.model._id).toBe(savedTask._id.toString())
        expect(response._body.model.title).toBe(data.title)
        expect(response._body.model.description).toBe(data.description)

        // Check the data in the database (optional)
        const newTask = await Task.findOne({ _id: response._body.model._id })
        expect(newTask).toBeTruthy()
        expect(newTask.title).toBe(data.title)
        expect(newTask.description).toBe(data.description)
      })
  })

  test("should delete a task using its id ", async () => {
    await request(app)
      .delete("/api/v1/tasks/" + savedTask._id.toString())
      .expect(200)
      .then(async () => {
        expect(
          await Task.findOne({ _id: savedTask._id.toString() })
        ).toBeFalsy()
      })
  })

  test("should return 404 when the id doesn't exist", async function () {
    await request(app)
      .get("/api/v1/tasks/" + taskId.toString())
      .expect(404)
      .then((response) => {
        expect(response._body.message).toBe("Task doesn't exist!")
      })
  })
})
