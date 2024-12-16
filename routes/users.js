const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const middleware = require("../middlewares/middleware");

router.get(
  "/list",
  middleware.timeoutOfTwoSeconds,
  usersController.getAllUsers
);

router.get(
  "/user/:id",
  middleware.timeoutOfTwoSeconds,
  usersController.getUserById
);

router.get(
  "/search",
  middleware.timeoutOfTwoSeconds,
  usersController.searchUser
);

router.post("/add", middleware.timeoutOfTwoSeconds, usersController.addUser);
router.put(
  "/user/:id",
  middleware.timeoutOfTwoSeconds,
  usersController.editUser
);

router.delete(
  "/user/:id",
  middleware.timeoutOfTwoSeconds,
  usersController.deleteUser
);

router.get("/**", middleware.returnNotFound);

module.exports = router;
