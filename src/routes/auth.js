const express = require('express');
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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
authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("Logout successful");
});
module.exports = authRouter;