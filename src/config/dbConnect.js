import mongoose from "mongoose";

mongoose.connect("mongodb+srv://financial_control:H70W0964aiNk7wWf@financialcontrol.mkqpwle.mongodb.net/financialControl?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;