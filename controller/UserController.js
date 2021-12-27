import User from "../model/User";
import SendmailController from "../utils/mailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  getLogin: async (req, res) => {
    res.render("login", { layout: false });
  },
  getRegister: async (req, res) => {
    res.render("register", { layout: false });
  },

  postRegister: async (req, res) => {
    const { userName, fullName, email, password } = req.body;

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    let user = await User.findOne({ where: { userName: userName } });
    if (user) {
      res.render("register", { layout: false, error: "Tài Khoản Đã tồn Tại" });
      return;
    }
    let newUser = await User.create(
      {
        userName: userName,
        fullName: fullName,
        email: email,
        password: hashPassword,
        status: false,
      },
      {
        fields: ["userName", "fullName", "email", "password", "status"],
      }
    );
    try {
      const token = await jwt.sign(
        {
          id: newUser.id,
          userName: userName,
          email: email,
        },
        "activeaccount",
        { expiresIn: "15m" }
      );

      const result = SendmailController(
        req.body.email,
        "ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG! XÁC NHẬN EMAIL ĐĂNG KÝ",
        "Chúc mừng bạn đã đăng ký thành công trên AshStore! Bạn vui lòng xác nhận email đăng ký bằng cách nhấn vào đường link sau:" +
          "<br>" +
          "<p>" +
          `http://localhost:3000/email-activate/${token}` +
          "<p>" +
          "<br>" +
          `Email: ${req.body.userName}` +
          "<br>" +
          `Mật khẩu: ${req.body.password}`
      );

      if (newUser) {
        res.json({
          result: "Vui lòng xác nhận email",
          data: newUser,
        });
      } else {
        res.json({
          result: "Đăng kí không thành công ",
          data: {},
          message: "insert new user failed",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        result: "failed db",
        data: {},
        message: "insert new user failse",
      });
    }
  },
  getEmailActivate: async (req, res) => {
    try {
      const token = req.params.token;

      if (token) {
        await jwt.verify(
          token,
          "activeaccount",
          async function (err, decodedToken) {
            if (err) {
              console.log(error);
              return;
            }
            const { id, userName, email } = decodedToken;

            let users = await User.findAll({
              attributes: [
                "id",
                "userName",
                "fullName",
                "email",
                "password",
                "status",
              ],
              where: { id: id },
            });

            if (users.length > 0) {
              await users.forEach(async (user) => {
                await user.update({
                  status: true,
                });
              });

              res.json({
                result: "Xác nhận thành công! Vui lòng vô lại trang web",
                data: users,
                message: "update user successfully",
              });
            } else {
              res.json({
                result: "failed",
                data: {},
                message: "cannot find user update",
              });
            }
          }
        );
      } else {
        return res.json({ error: "Something went wrong!" });
      }
    } catch (error) {
      res.json({ error: "Something went wrong!" });
    }
  },
  postEmailActivate: async (req, res) => {
    try {
      const token = req.params.token;

      if (token) {
        await jwt.verify(
          token,
          "activeaccount",
          async function (err, decodedToken) {
            if (err) {
              console.log(error);
              return;
            }
            const { id, userName, email } = decodedToken;

            let users = await User.findAll({
              attributes: [
                "id",
                "userName",
                "fullName",
                "email",
                "password",
                "status",
              ],
              where: { id: id },
            });

            if (users.length > 0) {
              await users.forEach(async (user) => {
                await user.update({
                  status: true,
                });
              });

              res.json({
                result: "Xác nhận thành công! Vui lòng vô lại trang web",
                data: users,
                message: "update user successfully",
              });
            } else {
              res.json({
                result: "failed",
                data: {},
                message: "cannot find user update",
              });
            }
          }
        );
      } else {
        return res.json({ error: "Something went wrong!" });
      }
    } catch (error) {
      res.json({ error: "Something went wrong!" });
    }
  },
  getLogout: (req, res) => {
    req.logout();
    res.redirect("/login");
  },
};
