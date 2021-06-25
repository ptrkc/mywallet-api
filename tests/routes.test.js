import app from "../src/app.js";
import supertest from "supertest";
import db from "../src/dbConfig.js";

beforeAll(async () => {
    await db.query(
        `DELETE FROM users; DELETE FROM sessions; DELETE FROM transactions;`
    );
});

afterAll(() => {
    db.end();
});

describe("GET /test", () => {
    it("returns status 200", async () => {
        const result = await supertest(app).get("/test");
        expect(result.status).toEqual(200);
    });
});

describe("POST /sign-up", () => {
    it("returns 201 for valid params", async () => {
        const body = {
            name: "Juneval Juvêncio",
            email: "jj2000@gmail.com",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(201);
    });

    it("returns 400 for bad name", async () => {
        const body = {
            name: "<><<><",
            email: "jj2000@gmail.com",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 400 for empty name", async () => {
        const body = {
            name: "",
            email: "jj2000@gmail.com",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 400 for empty email", async () => {
        const body = {
            name: "Juneval Juvêncio",
            email: "",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 400 for bad email", async () => {
        const body = {
            name: "Juneval Juvêncio",
            email: "juvenal@juvenal",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 400 for empty password", async () => {
        const body = {
            name: "Juneval Juvêncio",
            email: "juvenal@juvenal.com",
            password: "",
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 409 for email in use", async () => {
        const body = {
            name: "Juneval Juvêncio 2",
            email: "jj2000@gmail.com",
            password: "Senhaaaaa1234",
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(409);
    });

    it("returns 400 for no body", async () => {
        const result = await supertest(app).post("/sign-up");
        expect(result.status).toEqual(400);
    });
});
