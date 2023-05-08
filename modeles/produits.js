/** @format */

const mongoose = require("mongoose");

let schemaProduits = mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	prix: {
		type: Number,
		required: true,
	},

	fichierImage: {
		type: String,
		required: true,
	},
});

let Produits = (module.exports = mongoose.model("produits", schemaProduits));
