import express from "express";
import { create } from "express-handlebars";
import path from "path";
import route from "./routes/index.js";
import session from "express-session";
import bodyParser from "body-parser";

import passport from "./middlewares/passport";

const app = express();
const __dirname = path.resolve();
const hbs = create({
  extname: "hbs",
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
});

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  // res.locals.authenticated = !req.user.anonymous;
  next();
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

route(app);
app.listen(3000);
