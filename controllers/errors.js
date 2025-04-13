exports.pageNotFound=(req, res, next) => {
  res.status(404).render('404', {
    isLoggedIn: req.isLoggedIn,
    pageTitle: '404 - Page Not Found',
    user:req.session.user,
  });
}