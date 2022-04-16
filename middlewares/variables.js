module.exports = function (req, res, next) {
   res.locals.isAuth = req.session.isAuthenticated;
   res.locals.isAuthor = req.session.isAuthor;
   res.locals.csurf = req.csrfToken()

   next();
};
