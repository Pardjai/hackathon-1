const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const smtpTransport = require('../emails/mailTransport')
const regEmail = require('../emails/mailOptions/registration')
const resetEmail = require('../emails/mailOptions/reset')

router.get("/login", (req, res) => {
   res.render("auth/login", {
      isLogin: true,
      title: "Авторизация",
      error: req.flash('error')
   });
});

router.post("/register", async (req, res) => {
   try {
      const { email, name, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({
         email,
         name,
         password: hashPassword,
      });
      await user.save();
      smtpTransport.sendMail(regEmail(email), (err, res) => {
         err ? console.log(err) :
         smtpTransport.close()
      })
      res.redirect("/auth/login");
   } catch (e) {
      console.log(e);
   }
});

router.post("/login", async (req, res) => {
   try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
         const areSame = await bcrypt.compare(password, candidate.password);
         if (areSame) {
            req.session.user = candidate;
            req.session.isAuthenticated = true;
            req.session.isAuthor = candidate.isAuthor || false;
            req.session.save((err) => {
               if (err) {
                  throw err;
               }
               res.redirect("/");
            });
         } else {
            req.flash('error', 'Неверный пароль')
            res.redirect("/auth/login");
         }
      } else {
         req.flash('error', 'Пользователя с таким email не существует')
         res.redirect("/auth/login");
      }
   } catch (e) {
      console.log(e);
   }
});

router.get("/logout", async (req, res) => {
   req.session.destroy(() => {
      res.redirect("/");
   });
});

module.exports = router;
