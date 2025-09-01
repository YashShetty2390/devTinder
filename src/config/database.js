const mongoose = require('mongoose');

const connectDB =
    async () => {
        await mongoose.connect("mongodb+srv://yashashwinisshetty:Q1KhjMXaEHTSjxkv@cluster0.xw7umhm.mongodb.net/devTinder");
    };

module.exports = { connectDB };