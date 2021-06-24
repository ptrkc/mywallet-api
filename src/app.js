import express from "express";
import cors from "cors";
import { postSignIn, postSignUp, postSignOut } from "./routes/sign.js";
import { getTransactions, postTransaction } from "./routes/transaction.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sign-in", (req, res) => postSignIn(req, res));

app.post("/sign-up", (req, res) => postSignUp(req, res));

app.post("/sign-out", (req, res) => postSignOut(req, res));

app.get("/transactions", (req, res) => getTransactions(req, res));

app.post("/transaction", (req, res) => postTransaction(req, res));

app.get("/test", (req, res) => {
    res.send();
});

export default app;
