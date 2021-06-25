import app from "../src/app.js";
import supertest from "supertest";

export default function signInTests() {
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
}
