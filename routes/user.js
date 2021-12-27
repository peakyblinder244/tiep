import express from "express";
import UserController from "../controller/UserController";
import passport from "../middlewares/passport";
const router = express.Router();

router.get("/login", UserController.getLogin);

router.get("/register", UserController.getRegister);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/movie",
    failureRedirect: "/login",
  })
);

router.post("/register", UserController.postRegister);

router.get("/email-activate/:token", UserController.getEmailActivate);

router.post("/email-activate", UserController.postEmailActivate);

router.get("/logout", UserController.getLogout);

router.get("/", function (req, res) {
  res.redirect("/login");
});

export default router;
