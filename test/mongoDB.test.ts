import mongoose from "mongoose";
import { connectMongo } from "../config/mongoDB";

describe("Mongo Connection", () => {
  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("MongoDB is connected", async () => {
    expect(mongoose.connection.readyState).toEqual(1);
  });
});
