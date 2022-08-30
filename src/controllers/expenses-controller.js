import Reports from "./reports-controller.js";
import expenses from "../models/Expense.js";

class Expense extends Reports {

    constructor() {
        super(expenses, "expenses");
    }
}

export default Expense;