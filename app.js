const express = require("express");
const app = express();
const db = require("./app/config/database");
const middleware = require("./app/middlewares/middleware");

// Utilisation des middlewares
app.use(express.json());
app.use(middleware.timeoutOfTwoSeconds);
// app.use("/api/users/*", middleware.returnNotFound);

// Imports des Routes
const userRoutes = require("./app/routes/users");

// Utilisation des Routes
app.use("/api/users", userRoutes);

(async () => {
  try {
    await db.sync({ force: true }); // Cette ligne synchronise tous les modèles avec la base de données
    console.log("La base de données a été synchronisée avec succès !");
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la synchronisation de la base de données :",
      error
    );
  }
})();

module.exports = app;
