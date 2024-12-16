exports.returnNotFound = (req, res) => {
  res.status(404).json({ message: "Erreur 404 Route introuvable" });
};

exports.timeoutOfTwoSeconds = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
};
