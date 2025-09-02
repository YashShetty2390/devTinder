const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(4000, () => {
        console.log("Server is up")
    });
}).catch((err) => {
    console.log("Database connection failed", err.message);
});
