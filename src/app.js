import express from "express";
import db from "./config/dbConnect.js";
import revenues from "./models/Revenue.js";
import expenses from "./models/Expense.js";

db.on("error", console.log.bind(console, 'Connection Error'));
db.once("open", () => {
    console.log("Database Connection successful");
});

const app = express();
app.use(express.json());


app.post('/revenue', (req, res) => {
    revenues.create(req.body, (err, ok) => {
        err ? res.status(500).send('An error occurred while registering the revenue') : res.status(201).send('Revenue registered successfully')
    });
});


app.post('/expense', (req, res) => {
    expenses.create(req.body, (err, created) => {
        err ? res.status(500).send('An error occurred while registering the expense') : res.status(201).send('Expenses registered successfully')
    });
})



export default app;