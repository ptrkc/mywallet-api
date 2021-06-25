import supertest from "supertest";
import db from "../src/dbConfig.js";
import signUpTests from "./signUpTests.js";
import signInTests from "./signInTests.js";

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

describe("POST /sign-up", signUpTests);

describe("POST /sign-in", signInTests);
