import app from "../src/app.js";
import supertest from "supertest";

export default function signUpTests() {
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
}
