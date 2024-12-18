const express = require("express");
const app = express();
const mongoDB = require("./app/config/mongoose");
const middleware = require("./app/middlewares/middleware");

// Utilisation des middlewares
app.use(express.json());
app.use(middleware.timeoutOfTwoSeconds);
// app.use("/api/users/*", middleware.returnNotFound);

// Imports des Routes
const userRoutes = require("./app/routes/users");

// Utilisation des Routes
app.use("/api/users", userRoutes);

module.exports = app;
