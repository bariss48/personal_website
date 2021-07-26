const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
        // else giriyor kod
		res.redirect("/blogs");
	}	
};

module.exports = isLoggedIn;