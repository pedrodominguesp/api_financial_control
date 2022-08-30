import mongoose from "mongoose";
import QueryValidator from "../validators/query-validators.js";

const revenueSchema = new mongoose.Schema({
    description: {type:String, required:true },
    value: {type:Number, required:true},
    date: {type: Date, required:true}
});

revenueSchema.pre("save", async function (next) {
    const self = this;
    const queryValidator = new QueryValidator(revenues);
    await queryValidator.preValidation(self).then(data => {
        if (data.length) {
            self.invalidate("description", "description must be unique within one month");
            next(new Error("description must be unique within one month"));
        } else {
            next();
        }
    });
});

const revenues = mongoose.model("revenues", revenueSchema);

export default revenues;