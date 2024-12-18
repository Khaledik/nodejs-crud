const User = require("../models/User");
const { all } = require("../routes/users");

// Exercice 1 : GET - Récupérer tous les utilisateurs (getAll)
exports.getAllUsers = (req, res) => {
  try {
    User.findAll().then((users) => res.status(200).json(users));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la liste des utilisateurs :",
      error
    );
    res.status(500).json({ error });
  }
};

// Exercice 1.5 : GET - Récupérer tous les utilisateurs (getAll) avec pagination
exports.getAllUsersPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const userList = await User.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    res.status(200).json({
      total: userList.count,
      users: userList.rows,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la liste des utilisateurs :",
      error
    );
    res.status(500).json({ error });
  }
};

// Exercice 2 : GET - Récupérer un utilisateur par son ID (getById)
exports.getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const foundUser = await User.findByPk(userId);

    if (!foundUser) {
      res.status(404).json({ Erreur: "Utilisateur introuvable" });
    }

    res.status(200).json(foundUser);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error });
  }
};

// Exercice 3 : GET - Rechercher un utilisateur par un champ
exports.searchUser = (req, res) => {
  try {
    const name = req.query.name.toLowerCase();
    User.findAll({ where: { name: name } }).then((users) =>
      res.status(200).json(users)
    );
  } catch (error) {
    console.error("Erreur lors de la recherche d'utilisateur :", error);
    res.status(500).json({ error });
  }
};

// Exercice 4 : POST - Ajouter un nouvel utilisateur
exports.addUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    if (
      name == "" ||
      typeof name != "string" ||
      age < 0 ||
      !Number.isInteger(age)
    ) {
      res.status(400).json({ message: "Données invalides" });
    }

    await User.findOne({ where: { email } }).then((isUserExist) => {
      if (isUserExist)
        return res.status(400).json({ message: "l'email existe déjà." });
    });

    const newUser = await User.create({ name, age, email });

    res
      .status(201)
      .json({ message: "Utilisateur ajouté avec succès", user: newUser });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ error });
  }
};

//  Exercice 5 : PUT - Mettre à jour un utilisateur existant
exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, age, email } = req.body;

    if (
      name == "" ||
      typeof name != "string" ||
      age < 0 ||
      !Number.isInteger(age)
    ) {
      res.status(400).json({ message: "Données invalides" });
    }

    await User.findOne({ where: { email } }).then((isUserExist) => {
      if (isUserExist)
        return res.status(400).json({ message: "l'email existe déjà." });
    });

    await User.update(req.body, { where: { id: userId } }).then(
      (userUpdated) => {
        if (userUpdated[0] == 1) {
          res.status(201).json({
            message: "Utilisateur modifié avec succès",
            user: userUpdated,
          });
        } else {
          return res.status(403).send("Id Inconnu");
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res.status(500).json({ error });
  }
};

//  Exercice 6 : DELETE - Supprimer un utilisateur existant
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await User.findByPk(userId);

    if (!foundUser) {
      res.status(404).json({ Erreur: "Utilisateur introuvable" });
    }

    await User.destroy({ where: { id: userId } });
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ error });
  }
};

// GET - Obtenir la moyenne d'âge des utilisateurs
exports.getAverageAge = async (req, res) => {
  try {
    const allUser = await User.findAll();

    if (allUser.length === 0) {
      res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }

    const totalAge = allUser.reduce((acc, user) => acc + user.age, 0);
    const averageAge = totalAge / allUser.length;

    res.status(200).json({ "Moyenne d'âge": averageAge });
  } catch (error) {
    console.error("Erreur lors du calcul de la moyenne d'âge :", error);
    res.status(500).json({ error });
  }
};

// POST - Ajouter des utilisateurs en masse
exports.addUserByBulk = async (req, res) => {
  const userList = req.body;

  User.bulkCreate(userList)
    .then((newUsers) => {
      res.status(201).json({
        message: "Utilisateurs ajoutés avec succès",
        users: newUsers,
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la création des utilisateurs :", error);

      if (error.name === "SequelizeValidationError") {
        res.status(400).json({
          error: "Validation des données échouée",
          details: error.errors,
        });
      } else if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
          error: "Un ou plusieurs utilisateurs ne peuvent avoir le même mail",
          details: error.errors,
        });
      } else {
        res.status(500).json({
          error: "Erreur serveur",
          details: error.message,
        });
      }
    });
};
