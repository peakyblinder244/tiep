import passport from "passport";
import LocalStrategy1 from "passport-local";
import bcrypt from "bcrypt";
const LocalStrategy = LocalStrategy1.Strategy;
import User from "../model/User";
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      let user = await User.findOne({
        where: { userName: username },
        raw: true,
      });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      if (!validPassword(user, password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      if (user.status == false) {
        return done(null, false, { message: "Email not confirmed" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

function validPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

passport.serializeUser(function (user, done) {
  done(null, {
    userName: user.userName,
    fullName: user.fullName,
    id: user.id,
  });
});

passport.deserializeUser(function (user, done) {
  return done(null, user);
});

export default passport;
