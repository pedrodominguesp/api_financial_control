import express from "express";
import Revenue from "../controllers/revenues-controller.js";

const router = express.Router();
const revenue = new Revenue();
router
    .get("/revenues", revenue.listAll)
    .get("/revenues/:id", revenue.getById)
    .post("/revenues", revenue.save)
    .put("/revenues/:id", revenue.update)
    .delete("/revenues/:id", revenue.delete);
export default router;