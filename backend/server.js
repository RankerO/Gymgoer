const express = require("express");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./Routes/userRoutes")
const colors = require("colors");
const chats = require("./data/messege");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./errorMiddleware.js/errorMiddleware");

dotenv.config();
connectDB();
app.use(express.json());//to accept json data

app.use('/api/user', userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`.yellow.bold);
});