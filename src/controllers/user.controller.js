import passport from 'passport';

export async function getLogin(req, res) {
  return res.render('auth/login', { title: 'Login' });
}

export function postLogin(req, res, next) {
  const handler = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
  });
  handler(req, res, next);
}

export function getSignUp(req, res) {
  return res.render('auth/signup', { title: 'SignUp' });
}

export function postSignUp(req, res, next) {
  const handler = passport.authenticate('local-signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/signup',
  });
  handler(req, res, next);
}
