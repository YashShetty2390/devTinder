const express = require("express");
const app = express();


app.use("/test", (req, res) => {
    res.send("Test Path");
});
app.use("/hello", (req, res) => {
    res.send("Hello Path");
});
app.use("/", (req, res) => {
    res.send("Hello from server ");
});
app.listen(4000, () => {
    console.log("Server is up")
});