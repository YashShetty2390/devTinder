const express = require("express");
const profileRouter = express.Router();
const { auth } = require("../middlewares/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");
profileRouter.get("/profile/view", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -__v");
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.json(user);
    } catch (err) {
        res.status(500).send("Error occured while fetching profile");
    }
});
profileRouter.patch("/profile/edit", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -__v");
        if (!user) {
            return res.status(404).send("User not found");
        } else {
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                req.body,
                { new: true }
            ).select("-password -__v");
            res.json(updatedUser);
        }
    } catch (err) {
        res.status(500).send("Error occured while fetching profile for edit");
    }
});
profileRouter.post("/profile/forgotPassword", auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        if (!currentPassword || !newPassword) {
            return res.status(400).send("Current and new password are required");
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(401).send("Current password is incorrect");
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.send("Password updated successfully");
    } catch (err) {
        res.status(500).send("Error occured while updating password");
    }
});
module.exports = profileRouter;