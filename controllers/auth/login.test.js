const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const app = require("../../app");
const { User } = require("../../models/users");
const { DB_HOST_TEST } = process.env;

describe("test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection("users", () => {
      mongoose.connection.close(() => done());
    });
  });
  test("user login", async () => {
    const newUser = {
      email: "testName@testname.gmail",
      password: await bcrypt.hash("123456", 10),
      avatarURL: "test",
    };
    const user = await User.create(newUser);
    const loginUser = {
      email: "testName@testname.gmail",
      password: "123456",
    };
    const response = await request(app).post("/users/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token, email, subscription } = await User.findById(user._id);
    expect(body.token).toBe(token);
    expect(body.user.user).toBe(email);
    expect(body.user.subscription).toBe(subscription);
    expect(typeof body.user.user).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
