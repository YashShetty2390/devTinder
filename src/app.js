const express = require("express");
const { adminAuth } = require("./middlewares/adminAuth");
const app = express();

app.use("/admin", adminAuth);
app.use("/admin/getAdminData", (req, res, next) => {

    res.send("Fetched Admin Data")

})
app.use("/admin/deleteAdminData", (req, res) => {
    res.send("Deleted Admin Data");
});
app.get("/user", (req, res) => {
    console.log("Inside wildcard route");
    throw new error("trtrtrt");
    //res.send("Hello from server ");

});
app.use("/", (err, req, res, next) => {
    console.log("Inside wildcard route");
    if (err) {
        res.status(500).send("Something went wrong");
    }
});


app.listen(4000, () => {
    console.log("Server is up")
});