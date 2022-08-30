import express from "express";
import Expense from "../controllers/expenses-controller.js";

const router = express.Router();
const expense = new Expense();
router
    .get("/expenses", expense.listAll)
    .get("/expenses/:id", expense.getById)
    .post("/expenses", expense.save)
    .put("/expenses/:id", expense.update)
    .delete("/expenses/:id", expense.delete);
export default router;