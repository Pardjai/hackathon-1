module.exports = function (req, res, next) {
   res.locals.isAuth = req.session.isAuthenticated;
   res.locals.isAuthor = req.session.isAuthor;
   res.locals.user = req.session.user
   res.locals.csurf = req.csrfToken()

   next();
};
