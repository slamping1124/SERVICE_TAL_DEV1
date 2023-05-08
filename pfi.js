/** @format */
/**
 *Titre : PFI programation web 2
 Date : 30 - 04 - 23
 Auteur : Sabrina Taleb
 Description : Page de setting des librairies et des fonctionnalité du site web 
 */

//importation des librairies
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });

//sert a stocker les image updload
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, "./uploads/");
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname);
	},
});
app.use(upload.any());

//connecter a mon go db
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://1:1@cluster0.uepxzsg.mongodb.net/projet");

//connexion a la base de données
const db = mongoose.connection;
db.on("error", (error) => console.error("erreur de BD"));
db.on("open", () => console.log("connexion a la bd ok"));

//inserer les config de passeport
require("./config/passport")(passport);

//sert a utiliser la librairire express-layouts
app.use(expressLayouts);

//recupere les variable recu de "PORT" dans requete body
app.use(express.urlencoded({ extended: false }));

//creation de la session express (rrester connecter entre les fenetre)
app.use(
	session({
		secret: "text pour generer notre cle de session chaine de 10 caractere min",
		resave: true,
		saveUninitialized: true,
	})
);

//initialisation de passeport et relier a la session
app.use(passport.initialize());
app.use(passport.session());

//connexion a flash (afichage des messages d'erreur)
app.use(flash());

//attribution des messages d'erreur
app.use(function (req, rep, next) {
	rep.locals.success_msg = req.flash("success_msg");
	rep.locals.error_msg = req.flash("error_msg");
	rep.locals.error = req.flash("error");
	next();
});

//Route à utiliser
app.use("/css", express.static("./css"));
app.use("/js", express.static("./js"));
app.use("/images", express.static("./images"));

// Les routesà utiliser

app.use("/usagers", require("./routes/usagers"));
app.use("/", require("./routes/produits"));
app.use("/produits", require("./routes/produits"));

// Les vues à utiliser
app.set("views", "./pagesEJS");
app.set("view engine", "ejs");

//Indique quel port utiliser
app.listen(PORT, console.log(`Server started on port ${PORT}`));
