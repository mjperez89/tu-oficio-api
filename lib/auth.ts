class auth {

  static isLoggedIn(request, response, next){
      if (request.isAuthenticated()) {
          return next();
      }
      request.flash("error", "No autorizado, debe iniciar sesion")
      return response.redirect('/signin');
  };

}

export default auth;