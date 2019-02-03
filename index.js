const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
require("./services/passport");


app.use(
  //middleware
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //1 month
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(3000, () => console.log("connected"));
