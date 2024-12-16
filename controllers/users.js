let users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 32 },
  { id: 3, name: "Charlie", age: 28 },
  { id: 4, name: "Diana", age: 22 },
  { id: 5, name: "Eve", age: 30 },
  { id: 6, name: "Frank", age: 35 },
  { id: 7, name: "Grace", age: 27 },
  { id: 8, name: "Hannah", age: 26 },
  { id: 9, name: "Ian", age: 31 },
  { id: 10, name: "Jack", age: 29 },
  { id: 11, name: "Karen", age: 24 },
  { id: 12, name: "Leo", age: 33 },
  { id: 13, name: "Mona", age: 21 },
  { id: 14, name: "Nina", age: 34 },
  { id: 15, name: "Oscar", age: 23 },
  { id: 16, name: "Paula", age: 28 },
  { id: 17, name: "Quinn", age: 25 },
  { id: 18, name: "Rachel", age: 27 },
  { id: 19, name: "Sam", age: 22 },
  { id: 20, name: "Tom", age: 30 },
  { id: 21, name: "Uma", age: 26 },
  { id: 22, name: "Victor", age: 32 },
  { id: 23, name: "Wendy", age: 24 },
  { id: 24, name: "Xander", age: 29 },
  { id: 25, name: "Yara", age: 33 },
  { id: 26, name: "Zane", age: 21 },
];

let maxId = 26;

// Exercice 1 : GET - Récupérer tous les utilisateurs (getAll)
exports.getAllUsers = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const min = (page - 1) * limit;
  const max = page * limit;

  const usersPagination = users.slice(min, max);

  res.json(usersPagination);
};

// Exercice 2 : GET - Récupérer un utilisateur par son ID (getById)
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const foundUser = users.find((user) => user.id === id);

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
  const name = req.query.name;

  try {
    const searchResult = users.filter(
      (user) => user.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    res.status(200).json(searchResult);
  } catch (error) {
    console.error("Erreur lors de la recherche d'utilisateur :", error);
    res.status(500).json({ error });
  }
};

// Exercice 4 : POST - Ajouter un nouvel utilisateur
exports.addUser = (req, res) => {
  const { name, age } = req.body;
  maxId++;

  if (name == "" || age < 0) {
    res.status(400).json({ message: "Données invalides" });
  } else {
    const newUser = { id: maxId, name, age };

    users.push(newUser);

    res
      .status(201)
      .json({ message: "Utilisateur ajouté avec succès", user: newUser });
  }
};

//  Exercice 5 : PUT - Mettre à jour un utilisateur existant
exports.editUser = (req, res) => {
  const { name, age } = req.body;

  if (name == "" || age < 0) {
    res.status(400).json({ message: "Données invalides" });
  } else {
    const newUser = { id: parseInt(req.params.id), name, age };

    users = users.filter((user) => user.id != req.params.id);
    users.push(newUser);

    res
      .status(201)
      .json({ message: "Utilisateur modifié avec succès", user: newUser });
  }
};

//  Exercice 6 : DELETE - Supprimer un utilisateur existant
exports.deleteUser = (req, res) => {
  users = users.filter((user) => user.id != req.params.id);
  res.status(201).json({ message: "Utilisateur supprimé avec succès" });
};
