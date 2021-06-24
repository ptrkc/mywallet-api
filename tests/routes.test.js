import app from "../src/app.js";
import supertest from "supertest";

describe("GET /test", () => {
    it("returns status 200", async () => {
        const result = await supertest(app).get("/test");
        expect(result.status).toEqual(200);
    });
});
