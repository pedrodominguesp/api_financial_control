import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema(
    {
    description: {type:String, required:true },
    value: {type:Number, required:true},
    date: {type: Date, required:true}
}
);

const revenues = mongoose.model('revenues', revenueSchema);

export default revenues;