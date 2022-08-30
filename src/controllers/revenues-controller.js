import Reports from "./reports-controller.js";
import revenues from "../models/Revenue.js";

class Revenue extends Reports {

    constructor() {
        super(revenues, "revenues");
    }
}

export default Revenue;