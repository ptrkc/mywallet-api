import app from "../src/app.js";
import supertest from "supertest";

export default function getTransactionsTests(token) {
    it("returns 200 for valid params", async () => {
        const test = await supertest(app)
            .get("/transactions")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);
        console.log(test);
    });

    it("returns 401 for no/wrong token", async () => {
        await supertest(app)
            .get("/transactions")
            .set("Authorization", `Bearer 9813729839`)
            .expect(401);
    });
}
