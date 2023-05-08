/**
 * Titre: Devoir 1 - Service Web
 * Date: 03-03-2023
 * Auteur: Sabrina Taleb
 * Description: Cette page sert a definir le schema de la base de données
 * et contiens les fonction nessessaire pour chaque requete URI
 *
 * @format
 */

const mongoose = require("mongoose");

let schemaUsagers = mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	login: {
		type: String,
		required: true,
	},
	nom: {
		type: String,
		required: true,
	},
	pwd: {
		type: String,
		required: true,
	},
	role: {
		type: Array,
		required: true,
		default: ["normal"],
	},
	fichierImage: {
		type: String,
		required: true,
		default: "",
	},
	Date: {
		type: Date,
		required: true,
		default: new Date().toLocaleDateString(),
	},
});

let Usagers = (module.exports = mongoose.model("usagers", schemaUsagers));
