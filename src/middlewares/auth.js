const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send("Access denied. Please login first.");
        } else {
            const decoded = await jwt.verify(token, "devtindersecret");
            req.user = decoded;
            const user = User.findById(req.user._id);
            if (!user) {
                return res.status(401).send("User not found. Please login again.");
            }
        }
        next();
    }
    catch (err) {
        res.status(401).send("Invalid token. Please login again.");
    }

}
module.exports = {
    auth
}