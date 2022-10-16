const request = require("supertest");
const baseURL = "http://localhost:3001/api/v1";

describe("User", () => {
  const user = {};

  describe("Registration", () => {
    describe("POST /api/v1/auth/register", () => {
      beforeEach(() => {
        user.username = "Mike Johnson";
        user.email = "mikejohnson@yahoo.com";
        user.password = "San#3Lung?";
      });

      it("should not create a user without a username", async () => {
        user.username = "";

        const response = await request(baseURL)
          .post("/auth/register")
          .send(user);

        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual("Please provide a username.");
      });

      it("should not create a user without an amail", async () => {
        user.email = "";

        const response = await request(baseURL)
          .post("/auth/register")
          .send(user);

        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual("Please provide your email.");
      });

      it("should not create a user if format of email is wrong", async () => {
        user.email = "mikejohnson@yahoocom";

        const response = await request(baseURL)
          .post("/auth/register")
          .send(user);

        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual("Please provide a valid email.");
      });

      it("should not create a user without a password", async () => {
        user.password = "";

        const response = await request(baseURL)
          .post("/auth/register")
          .send(user);

        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual("Please provide a password.");
      });

      it("should not create a user if format of password is wrong", async () => {
        user.password = "san#3lung?";

        const response = await request(baseURL)
          .post("/auth/register")
          .send(user);

        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual(
          "Invalid password. Must have at least one lowercase character, one uppercase character, one digit and one special character (!@$%&?)."
        );
      });

      it("should not create a user if it's a duplicate", async () => {
        user.username = "Alex Wong";

        const response = await request(baseURL)
          .post("/auth/register")
          .send(user);

        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual(
          "Duplicate value entered for username field. Please choose another value."
        );
      });

      it("should create a user with valid input", async () => {
        const response = await request(baseURL)
          .post("/auth/register")
          .send(user);

        expect(response.status).toEqual(201);
        expect(response.body.user.username).toEqual("Mike Johnson");
      });
    });
  });

  describe("Login", () => {
    // let id;
    // afterAll(async () => {
    //   const response = await request(baseURL).delete(`/auth/register/${id}`);
    //   console.log(response.status, response.body.msg);
    // });

    describe("POST /api/v1/auth/login", () => {
      it("should not login the user without user email", async () => {
        const response = await request(baseURL).post("/auth/login").send({
          email: "",
          password: user.password,
        });

        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual("Please provide email and password.");
      });

      it("should not login the user if the email is incorrect", async () => {
        const response = await request(baseURL).post("/auth/login").send({
          email: "mikejohnson@gmail.com",
          password: user.password,
        });

        expect(response.status).toEqual(401);
        expect(response.body.msg).toEqual("Invalid credentials. No such user.");
      });

      it("should not login the user without user password", async () => {
        const response = await request(baseURL).post("/auth/login").send({
          email: user.email,
          password: "",
        });

        expect(response.status).toEqual(400);
        expect(response.body.msg).toEqual("Please provide email and password.");
      });

      it("should not login the user if the password is incorrect", async () => {
        const response = await request(baseURL).post("/auth/login").send({
          email: user.email,
          password: "san#3lung?",
        });

        expect(response.status).toEqual(401);
        expect(response.body.msg).toEqual(
          "Invalid credentials. Incorrect password."
        );
      });

      it("should login the user with valid input", async () => {
        const response = await request(baseURL).post("/auth/login").send({
          email: user.email,
          password: user.password,
        });

        expect(response.status).toEqual(200);
        expect(response.body.user.username).toEqual("Mike Johnson");
        // id = response.body.user._id;
      });
    });
  });
});
