const loadAuth = (req, res) => {
    res.render('auth'); 
};

const successGoogleLogin = (req, res) => {
    if (!req.user) {
        res.redirect('/failure');
    } else {
        res.send("Welcome " + req.user.email);
    }
};

const failureGoogleLogin = (req, res) => {
    res.send("Error");
};

module.exports = {
    loadAuth,
    successGoogleLogin,
    failureGoogleLogin
};
