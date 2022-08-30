class Reports {

    constructor(reportModel, titleModel) {
        this.reportModel = reportModel;
        this.titleModel = titleModel;
    }
    
    listAll = (req, res) => {
        this.reportModel.find((err, data) => {
            res.status(200).json(data);
        });
    };


 

    getById = (req, res) => {
        const id = req.params.id;
        this.reportModel.findById(id, (err, data) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - ${this.titleModel} id not found` });
            } else {
                res.status(200).send(data);
            }
        });
    };

    save = (req, res) => {
        let createdReport = new this.reportModel(req.body);

        createdReport.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Error when registering ${this.titleModel} data` });
            } else {
                res.status(201).send(createdReport.toJSON());
            }
        });
    };

    update = async (req, res) => {
        const id = req.params.id;
        try {
            req.body.date = new Date(req.body.date);
        } catch (error) {
            res.status(500).send({ message: "Invalid date format" });
        }
        const findByConditions = await this.preValidation(req.body);
        if (findByConditions.length && findByConditions[0].id !== id) {
            res.status(500).send({ message: "Description must be unique within one month" });
        } else {
            this.reportModel.updateOne({ _id: id }, { $set: req.body }, (err) => {
                if (!err) {
                    res.status(200).send({ message: `${this.titleModel} updated successfully` });
                } else {
                    res.status(500).send({ message: err.message });
                }
            });
        }
    };

    delete = (req, res) => {
        const id = req.params.id;

        this.reportModel.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: `${this.titleModel} deleted successfully` });
            } else {
                res.status(500).send({ message: err.message });
            }
        });
    };
}

export default Reports;