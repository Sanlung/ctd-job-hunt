const request = require("supertest");
const baseURL = "http://localhost:3001/api/v1";

describe("Jobs", () => {
  let token;
  let jobId;
  beforeAll(async () => {
    const response = await request(baseURL).post("/auth/login").send({
      email: "al.jumbo@yahoo.com",
      password: "#3Dragons?",
    });
    token = response.body.token;
  });

  describe("GET /jobs?page={n}", () => {
    it("should require authentication with JWT-token", async () => {
      const response = await request(baseURL).get("/jobs?page=1");

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should not fetch the job entries if JWT-token is invalid", async () => {
      const response = await request(baseURL)
        .get("/jobs?page=1")
        .set("Authorization", `Bearer ${token.slice(1)}`);

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should fetch a number of job entries when authenticated", async () => {
      const response = await request(baseURL)
        .get("/jobs?page=1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.type).toBe("application/json");
    });
  });

  describe("POST /jobs", () => {
    it("should require authentication with JWT-token", async () => {
      const response = await request(baseURL).post("/jobs").send({
        company: "Zoom",
        position: "Full-stack iOS Engineer",
      });

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should not create a job entry if JWT-token is invalid", async () => {
      const response = await request(baseURL)
        .post("/jobs")
        .set("Authorization", `Bearer ${token.slice(1)}`)
        .send({
          company: "Zoom",
          position: "Full-stack iOS Engineer",
        });

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should not create a job entry without company info", async () => {
      const response = await request(baseURL)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
          company: "",
          position: "Full-stack iOS Engineer",
        });

      expect(response.status).toEqual(400);
      expect(response.body.msg).toEqual("Please provide company name.");
    });

    it("should not create a job entry without position info", async () => {
      const response = await request(baseURL)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
          company: "Zoom",
          position: "",
        });

      expect(response.status).toEqual(400);
      expect(response.body.msg).toEqual("Please provide the position.");
    });

    it("should require email to have valid address", async () => {
      const response = await request(baseURL)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
          company: "Zoom",
          position: "Full-stack iOS Engineer",
          contact: "Maria Gonzalez",
          email: "mariaigonzalez@zoomcom",
        });

      expect(response.status).toEqual(400);
      expect(response.body.msg).toEqual("Please provide a valid email.");
    });

    it("should create a job entry with valid input", async () => {
      const response = await request(baseURL)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
          company: "Zoom",
          position: "Full-stack iOS Engineer",
        });

      expect(response.status).toEqual(201);
      expect(response.type).toBe("application/json");

      jobId = response.body.job._id;
    });
  });

  describe("GET /jobs/:id", () => {
    it("should require authentication with JWT-token", async () => {
      const response = await request(baseURL).get(`/jobs/${jobId}`);

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should not fetch the job entry if JWT-token is invalid", async () => {
      const response = await request(baseURL)
        .get(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token.slice(1)}`);

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should fetch the job entry with valid input", async () => {
      const response = await request(baseURL)
        .get(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.type).toBe("application/json");
    });
  });

  describe("PATCH /jobs/:id", () => {
    it("should require authentication with JWT-token", async () => {
      const response = await request(baseURL).patch(`/jobs/${jobId}`).send({
        company: "Paypal",
        position: "Full-stack iOS Engineer",
      });

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should not update the job entry if JWT-token is invalid", async () => {
      const response = await request(baseURL)
        .patch(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token.slice(1)}`)
        .send({
          company: "Paypal",
          position: "Full-stack iOS Engineer",
        });

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should not update the job entry with invalid email address", async () => {
      const response = await request(baseURL)
        .patch(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          company: "Paypal",
          position: "Full-stack iOS Engineer",
          email: "mariagonzalez@paypalcom",
        });

      expect(response.status).toEqual(400);
      expect(response.body.msg).toEqual("Please provide a valid email.");
    });

    it("should update the job entry with valid input", async () => {
      const response = await request(baseURL)
        .patch(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          company: "Paypal",
          position: "Full-stack iOS Engineer",
        });

      expect(response.status).toEqual(200);
      expect(response.type).toBe("application/json");
    });
  });

  describe("DELETE /jobs/:id", () => {
    it("should require authentication with JWT-token", async () => {
      const response = await request(baseURL).delete(`/jobs/${jobId}`);

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should not delete the job entry if JWT-token is invalid", async () => {
      const response = await request(baseURL)
        .delete(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token.slice(1)}`);

      expect(response.status).toEqual(401);
      expect(response.body.msg).toEqual("Authentication invalid.");
    });

    it("should delete the job entry when request is authenticated", async () => {
      const response = await request(baseURL)
        .delete(`/jobs/${jobId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body.msg).toEqual(`Job ID no. ${jobId} has been deleted`);
    });
  });
});
