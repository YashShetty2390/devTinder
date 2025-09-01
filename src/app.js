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
app.post("/signup", (req, res) => {
    const userObj = new User({
        firstName: "Yashashwini",
        lastName: "Shetty",
        emailId: "yashashwinisshetty@gmail.com",
        gender: "female",
        age: 35
    });
    try {
        userObj.save();
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
