const express = require("express");
const router = express.Router();

const {register, login, logOut} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/log-out", logOut);

module.exports = router;
