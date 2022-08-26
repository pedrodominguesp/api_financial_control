import app from "./src/app.js";

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is up and running at port: ${port}`);
})