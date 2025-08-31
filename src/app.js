const express = require("express");
const { adminAuth } = require("./middlewares/adminAuth");
const app = express();

app.use("/admin", adminAuth);
app.use("/admin/getAdminData", (req, res) => {
    res.send("Fetched Admin Data")
})
app.use("/admin/deleteAdminData", (req, res) => {
    res.send("Deleted Admin Data");
});

app.use("/", (req, res) => {
    res.send("Hello from server ");
});
app.listen(4000, () => {
    console.log("Server is up")
});