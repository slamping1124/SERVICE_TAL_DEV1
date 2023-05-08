/** @format */

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

///chager le modeles
const Usagers = require("../modeles/usagers");
const passport = require("passport");

module.exports = function (passeport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "login",
			},
			(login, password, done) => {
				//rechercher notre utulisateur
				Usagers.findOne({ login: login })
					.then((usager) => {
						if (!usager) {
							console.log("allo");
							return done(null, false, {
								message: "ce login n'existe pas",
							});
						}
						bcrypt.compare(password, usager.pwd, (err, isMatch) => {
							if (err) throw err;
							if (isMatch) {
								return done(null, usager);
							} else {
								return done(null, false, {
									message: "mots de passe invalide",
								});
							}
						});
					})
					.catch((err) => console.log("passport erreur", err));
			}
		)
	);
	passport.serializeUser(function (usager, done) {
		done(null, usager.login);
	});
	passport.deserializeUser(function (login, done) {
		Usagers.findOne({ login: login })
			.then((usager) => done(null, usager))
			.catch((err) => done(err, null));
	});
};
