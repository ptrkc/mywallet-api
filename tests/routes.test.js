import app from "../src/app.js";
import supertest from "supertest";
import db from "../src/dbConfig.js";

let token;
let config;

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
        await supertest(app).get("/test").expect(200);
    });
});

describe("POST /sign-up", () => {
    it("returns 201 for valid params", async () => {
        const body = {
            name: "Juneval Juvêncio",
            email: "jj2000@gmail.com",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        await supertest(app).post("/sign-up").send(body).expect(201);
    });

    it("returns 400 for bad name", async () => {
        const body = {
            name: "<><<><",
            email: "jj2000@gmail.com",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        await supertest(app).post("/sign-up").send(body).expect(400);
    });

    it("returns 400 for empty name", async () => {
        const body = {
            name: "",
            email: "jj2000@gmail.com",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        await supertest(app).post("/sign-up").send(body).expect(400);
    });

    it("returns 400 for empty email", async () => {
        const body = {
            name: "Juneval Juvêncio",
            email: "",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        await supertest(app).post("/sign-up").send(body).expect(400);
    });

    it("returns 400 for bad email", async () => {
        const body = {
            name: "Juneval Juvêncio",
            email: "juvenal@juvenal",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        await supertest(app).post("/sign-up").send(body).expect(400);
    });

    it("returns 400 for empty password", async () => {
        const body = {
            name: "Juneval Juvêncio",
            email: "juvenal@juvenal.com",
            password: "",
        };
        await supertest(app).post("/sign-up").send(body).expect(400);
    });

    it("returns 409 for email in use", async () => {
        const body = {
            name: "Juneval Juvêncio 2",
            email: "jj2000@gmail.com",
            password: "Senhaaaaa1234",
        };
        await supertest(app).post("/sign-up").send(body).expect(409);
    });

    it("returns 400 for no body", async () => {
        await supertest(app).post("/sign-up").expect(400);
    });
});

describe("POST /sign-in", () => {
    it("returns 200 for valid params", async () => {
        const body = {
            email: "jj2000@gmail.com",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        await supertest(app)
            .post("/sign-in")
            .send(body)
            .expect(200)
            .expect("Content-Type", /json/);
    });

    it("returns 400 for bad email", async () => {
        const body = {
            email: "  asd@asdasd ",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        await supertest(app).post("/sign-in").send(body).expect(400);
    });

    it("returns 400 for empty email", async () => {
        const body = {
            email: "     ",
            password: "JuV3N@lLlLll!@#$%^&*(",
        };
        await supertest(app).post("/sign-in").send(body).expect(400);
    });

    it("returns 400 for empty password", async () => {
        const body = {
            email: "jj2000@gmail.com",
            password: "",
        };
        await supertest(app).post("/sign-in").send(body).expect(400);
    });

    it("returns 401 for wrong password", async () => {
        const body = {
            email: "jj2000@gmail.com",
            password: "asdfasdfasdfasdf",
        };
        await supertest(app).post("/sign-in").send(body).expect(401);
    });

    it("returns 401 for wrong/inexistent email", async () => {
        const body = {
            email: "thisemail@isnotinthedatabase.com",
            password: "thiscanbeanything",
        };
        await supertest(app).post("/sign-in").send(body).expect(401);
    });

    it("returns 400 for no body", async () => {
        await supertest(app).post("/sign-in").expect(400);
    });
});
