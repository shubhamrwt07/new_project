const passport = require('passport');
const userController = require('../controller/googleAuth.controller');

module.exports = function Route(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/', userController.loadAuth);

    app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/success', failureRedirect: '/failure' })
    );

    app.get('/success', userController.successGoogleLogin);
    app.get('/failure', userController.failureGoogleLogin);
};
