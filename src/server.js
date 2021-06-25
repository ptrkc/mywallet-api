import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 4000;

app.listen(SERVER_PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}.`);
});
