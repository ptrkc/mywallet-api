import db from "../dbConfig.js";

export async function getTransactions(req, res) {
    try {
        if (!req.headers["authorization"]) {
            res.sendStatus(401);
            return;
        }
        const authorization = req.headers["authorization"];
        const token = authorization.replace("Bearer ", "");
        const session = await db.query(
            `SELECT * FROM sessions WHERE token = $1`,
            [token]
        );
        if (session.rows.length === 0) {
            res.sendStatus(401);
            return;
        }
        const transactions = await db.query(
            `SELECT transactions.id, transactions.description, transactions.value, transactions.type, transactions.date 
            FROM transactions WHERE "userId" = $1`,
            [session.rows[0]["userId"]]
        );
        res.send(transactions.rows);
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
}

export async function postTransaction(req, res) {
    try {
        if (!req.headers["authorization"]) {
            res.sendStatus(401);
            return;
        }
        const authorization = req.headers["authorization"];
        const token = authorization.replace("Bearer ", "");
        const session = await db.query(
            `SELECT * FROM sessions WHERE token = $1`,
            [token]
        );
        if (session.rows.length === 0) {
            res.sendStatus(401);
            return;
        }
        const { description, value, type } = req.body;
        await db.query(
            `INSERT INTO transactions ("userId", description, value, type, date) VALUES ($1, $2, $3, $4, NOW());`,
            [session.rows[0]["userId"], description, value, type]
        );
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
}
