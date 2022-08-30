import { endOfMonth, startOfMonth } from "date-fns";

class QueryValidator {

    constructor(model) {
        this.model = model;
    }

    preValidation = (query) => {
        return this.model.find(this.filterPreSaveOrUpdate(query));
    };

    filterPreSaveOrUpdate = (report) => {
        return {
            date: {
                $gte: startOfMonth(report.date),
                $lte: endOfMonth(report.date)
            },
            description: report.description
        };
    };
}

export default QueryValidator;