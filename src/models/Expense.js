import mongoose from "mongoose";

import Expense from "../controllers/expenses-controller.js";

const expenseSchema = new mongoose.Schema({
    description: {type:String, required:true },
    value: {type:Number, required:true},
    date: {type: Date, required:true}
});

expenseSchema.pre("save", async function(next){
    const self = this;

    await Expense.preValidation(self).then(data => {
        if(data.length){
            self.invalidate("description", "description must be unique within one month");
            next(new Error("description must be unique within one month"));
        } else {
            next();
        }
    });
});

const expenses = mongoose.model("expenses", expenseSchema);

export default expenses;