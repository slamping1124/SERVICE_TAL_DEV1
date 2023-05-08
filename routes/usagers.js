/** @format */

const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Usagers = require("../modeles/usagers");
const {
	forwardAuthenticated,
	estAdmin,
	ensureAuthenticated,
} = require("../config/auth");
const mongoose = require("mongoose");
const nodeJSpath = require("path");
const fs = require("fs");
// ajout des routes pour l'authentification

module.exports = router;
