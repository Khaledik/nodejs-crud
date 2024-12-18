const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/list", usersController.getAllUsers);

router.get("/list-paginated", usersController.getAllUsersPagination);

router.get("/user/:id", usersController.getUserById);

router.get("/search", usersController.searchUser);

router.get("/average-age", usersController.getAverageAge);

router.post("/add", usersController.addUser);

router.post("/add-bulk", usersController.addUserByBulk);

router.put("/user/:id", usersController.editUser);

router.delete("/user/:id", usersController.deleteUser);

module.exports = router;
