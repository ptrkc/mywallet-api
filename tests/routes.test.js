import db from "../src/dbConfig.js";
import signUpTests from "./signUpTests.js";
import signInTests from "./signInTests.js";
import {
    getTransactionsTests,
    postTransactionTests,
} from "./transactionTests.js";

const token = "1446e02d-6a9c-457a-ac8c-2d012ec1064d";

beforeAll(async () => {
    await db.query(`
        DELETE FROM users;
        DELETE FROM sessions;
        DELETE FROM transactions;
        INSERT INTO users (name, email, password) 
        VALUES ('Banânio Bananácio', 'bananio@bmail.com', '$2b$10$SprgUnx2K6H/qNpxfjShj.e4KGNdcp5XQu/mqZFinjfzVYOEzvPlG');
        INSERT INTO sessions ("userId", token) 
        VALUES ((SELECT id FROM users WHERE email = 'bananio@bmail.com'),'${token}');
    `);
});

afterAll(async () => {
    await db.query(`
        DELETE FROM users;
        DELETE FROM sessions;
        DELETE FROM transactions;
    `);
    db.end();
});

describe("POST /sign-up", signUpTests);

describe("POST /sign-in", signInTests);

describe("POST /transaction", () => postTransactionTests(token));

describe("GET /transactions", () => getTransactionsTests(token));
