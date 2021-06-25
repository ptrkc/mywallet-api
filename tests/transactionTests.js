import app from "../src/app.js";
import supertest from "supertest";

export function getTransactionsTests(token) {
    it("returns 200 for valid params", async () => {
        const res = await supertest(app)
            .get("/transactions")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                balance: expect.any(Number),
                transactions: expect.any(Array),
            })
        );
    });

    it("returns 401 for no/wrong token", async () => {
        await supertest(app)
            .get("/transactions")
            .set("Authorization", `Bearer 9813729839`)
            .expect(401);
    });
}

export function postTransactionTests(token) {
    it("returns 201 for valid params", async () => {
        const body = {
            description: "Job",
            value: 30000,
            type: "income",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(201);
    });

    it("returns 201 for valid params", async () => {
        const body = {
            description: "Bkzinho",
            value: "3099",
            type: "expense",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(201);
    });

    it("returns 401 for no/wrong token", async () => {
        const body = {
            description: "Bkzinho",
            value: "3099",
            type: "expense",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer 9813729839`)
            .send(body)
            .expect(401);
    });

    it("returns 400 for empty description", async () => {
        const body = {
            description: "   ",
            value: "3099",
            type: "expense",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(400);
    });

    it("returns 400 for bad description", async () => {
        const body = {
            description: "<><<><",
            value: "3099",
            type: "expense",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(400);
    });

    it("returns 400 for bad value", async () => {
        const body = {
            description: "Bkzinho",
            value: "-3099",
            type: "expense",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(400);
    });

    it("returns 400 for bad value", async () => {
        const body = {
            description: "Bkzinho",
            value: "9999999999999999",
            type: "expense",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(400);
    });

    it("returns 400 for empty value", async () => {
        const body = {
            description: "Bkzinho",
            value: "   ",
            type: "expense",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(400);
    });

    it("returns 400 for empty type", async () => {
        const body = {
            description: "Bkzinho",
            value: "3099",
            type: "    ",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(400);
    });

    it("returns 400 for bad type", async () => {
        const body = {
            description: "Bkzinho",
            value: "3099",
            type: "food",
        };
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .send(body)
            .expect(400);
    });

    it("returns 400 for no body", async () => {
        await supertest(app)
            .post("/transaction")
            .set("Authorization", `Bearer ${token}`)
            .expect(400);
    });
}
