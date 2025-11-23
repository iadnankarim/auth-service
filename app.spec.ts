import { calculateCount } from "./src/utlis";
import request from "supertest";
import app from "./src/app.js";

describe("app", () => {
  it("should return corrct discount amount", () => {
    const discount = calculateCount(100, 10);
    expect(discount).toBe(10);
  });

  it("should return 200 ", async () => {
    const resposne = await request(app).get("/").send();
    expect(resposne.statusCode).toBe(200);
  });
});
