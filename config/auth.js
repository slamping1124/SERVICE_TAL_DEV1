/** @format */

module.exports = {
	ensureAuthenticated: function (req, rep, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash("error_msg", "connecter pour acceder au site");
		rep.redirect("/");
	},
	estGestion: function (req, rep, next) {
		if (req.isAuthenticated()) {
			let gestion = req.user.role.includes("gestion");
			if (gestion) {
				return next();
			} else {
				req.flash(
					"error_msg",
					"vous devez etre gestionnaire pour acceder a cette page"
				);
				rep.redirect("/");
			}
		}
		req.flash("error_msg", "connecter pour acceder au site");
		rep.redirect("/");
	},
	estAdmin: function (req, rep, next) {
		if (req.isAuthenticated()) {
			let admin = req.user.role.includes("admin");
			if (admin) {
				return next();
			} else {
				req.flash(
					"error_msg",
					"vous devez etre admin pour acceder a cette page"
				);
				rep.redirect("/");
			}
		}
		req.flash("error_msg", "connecter pour acceder au site");
		rep.redirect("/");
	},
	forwardAuthenticated: function (req, rep, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		rep.redirect("/");
	},
};
