import express from "express";
import Expense from "../controllers/expenses-controller.js";

const router = express.Router();

router
    .get('/expenses', Expense.listAll)
    .get('/expenses/:id', Expense.getById)
    .post('/expenses', Expense.save)
    .put('/expenses/:id', Expense.update)
    .delete('/expenses/:id', Expense.delete)
export default router;