import express from "express";
import expenses from './expenses-routes.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send("Api Financial Control");
    });
    
    app.use(
        express.json(),
        expenses
    );
}

export default routes;