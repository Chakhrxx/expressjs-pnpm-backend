import request from "supertest";
import app, { server } from "../index";

describe("Test the root path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app).get("/");
    // expect(response.status).toBe(200);
  });
});

afterAll((done) => {
  server.close(done);
});
