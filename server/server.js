const express = require("express");
const app = express();
const passport = require("./middleware/passport");
const cors = require("cors");
// const cookieSession = require('cookie-session');
var session = require('express-session')


require("dotenv").config();
require("./config/db.config"); 

app.use(cors());
app.use(express.json());
require("./routes/index")(app);

// app.use(cookieSession({
//     name: 'session',
//     keys: [process.env.SESSION_SECRET],
//     maxAge: 24 * 60 * 60 * 1000 
// }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8090;
const host = process.env.HOST || 'http://localhost:';
app.listen(port, () => {
    console.log(`App is running on ${host}${port}`);
});
