import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
    description: {type:String, required:true },
    value: {type:Number, required:true},
    date: {type: Date, required:true}
}
);

const expenses = mongoose.model('expenses', expenseSchema);

export default expenses;