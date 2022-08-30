import { endOfMonth, startOfMonth } from "date-fns";

import expenses from "../models/Expense.js"

class Expense{
    static filterPreSaveOrUpdate = (expense) => {
        return {
            date:{
                $gte: startOfMonth(expense.date),
                $lte: endOfMonth(expense.date)
            },
            description:expense.description
        }
    };
    
    static listAll = (req, res) => {
        expenses.find((err, expenses) => {
            res.status(200).json(expenses);
        })
    }

    static getById = (req, res) =>{
        const id = req.params.id;
        expenses.findById(id, (err, expenses) => {
            if (err) {
                res.status(400).send({message: `${err.message} - expense id not found`})
            } else {
                res.status(200).send(expenses);
            }
        });
    }

    static save = (req, res) => {
        let expense = new expenses(req.body);

        expense.save((err) => {
            if(err) {
                res.status(500).send({message:`${err.message} - Error when registering expense data`})
            } else {
                res.status(201).send(expense.toJSON());
            }
        });
    }

    static update = async (req, res) => {
        const id = req.params.id;
        try {
            req.body.date = new Date(req.body.date);
        } catch (error) {
            res.status(500).send({message: "Invalid date format"});
        }
        const findByConditions = await this.preValidation(req.body);
        if (findByConditions.length && findByConditions[0].id !== id) {
            res.status(500).send({message: "Description must be unique within one month"});
        } else {
            expenses.updateOne({_id: id}, {$set: req.body}, (err) => {
                if (!err) {
                    res.status(200).send({message: "Expense updated successfully"});
                } else {
                    res.status(500).send({message: err.message});
                }
            });
        }
        
    }

    static delete = (req, res) => {
        const id = req.params.id;
        
        expenses.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({message: "Expense deleted successfully"});
            } else {
                res.status(500).send({message: err.message});
            }
        });
    }

    static preValidation = (expense) => {
        return expenses.find(this.filterPreSaveOrUpdate(expense));
    }
}

export default Expense;