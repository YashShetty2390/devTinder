const express = require("express");
const { auth } = require("./middlewares/auth");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());
app.post("/signup", async (req, res) => {
    const userObj = new User(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        userObj.password = await bcrypt.hash(userObj.password, salt);
        await userObj.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(500).send("Error occured while saving data", +err);
    }
});


app.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
        const user = await User.find({ emailId });
        if (user.length === 0) {
            return res.status(400).send("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).send("Invalid email or password");
        } else {
            const token = jwt.sign({ _id: user[0]._id }, "devtindersecret", { expiresIn: '1h' });
            res.cookie("token", token, { httpOnly: true });
            res.send("Login successful");
        }

    } catch (err) {
        res.status(500).send("Error occured while logging in");
    }
});

app.get("/feed", auth, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (err) {
        res.status(500).send("Error occured while fetching data");
    }
});
connectDB().then(() => {
    console.log("Database connection established");
    app.listen(4000, () => {
        console.log("Server is up")
    });
}).catch((err) => {
    console.log("Database connection failed", err.message);
});
