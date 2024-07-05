const express = require("express");
const app = express();
const passport = require("./middleware/passport");
const cors = require("cors");
const session = require("express-session");
// const referralRoute = require("./routes/referralRoute"); 

require("dotenv").config();
require("./config/db.config");
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/index")(app)

// Mount referral route
// app.use("/referral", referralRoute);

const port = process.env.PORT || 8090;
const host = process.env.HOST || 'http://localhost:';
app.listen(port, () => {
  console.log(`App is running on ${host}${port}`);
});
