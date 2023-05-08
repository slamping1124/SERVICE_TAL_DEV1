/** @format */

const express = require("express");
//const passport = require("passport");
const router = express.Router();
const Produits = require("../modeles/produits");

const mongoose = require("mongoose");
//const nodeJSpath = require("path");
//const fs = require("fs");

//GET produit femme
router.get("/", (requete, reponse) => {
	Produits.find({}, null)
		.exec()
		.then((produits) =>
			reponse.render("produits", {
				titre: "Prduits",
				produits,
			})
		)
		.catch((err) => console.log(err));
});

//GET produit femme
router.get("/femme", (requete, reponse) => {
	Produits.find({ genre: "femme" }, null)
		.exec()
		.then((produits) =>
			reponse.render("femme", {
				titre: "Produits femme",
				produits,
			})
		)
		.catch((err) => console.log(err));
});
//GET produit homme
router.get("/homme", (requete, reponse) => {
	Produits.find({ genre: "homme" }, null)
		.exec()
		.then((produits) =>
			reponse.render("homme", {
				titre: "Produits homme",
				produits,
			})
		)
		.catch((err) => console.log(err));
});
module.exports = router;
