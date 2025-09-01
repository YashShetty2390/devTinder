const express = require("express");
const { adminAuth } = require("./middlewares/adminAuth");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/User");

/*app.use("/admin", adminAuth);
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
});*/
app.use(express.json());
app.post("/signup", async (req, res) => {
    console.log(req.body);
    const userObj = new User(req.body);
    try {
        await userObj.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(500).send("Error occured while saving data");
    }
})


connectDB().then(() => {
    console.log("Database connection established");
    app.listen(4000, () => {
        console.log("Server is up")
    });
}).catch((err) => {
    console.log("Database connection failed");
});
