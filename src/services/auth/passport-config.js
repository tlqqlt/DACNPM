import passport from 'passport';
import passportLocal from 'passport-local';
import * as userService from '../user.service';
import logger from '../../utils/logger';

const LocalStrategy = passportLocal.Strategy;

const initPassportLocal = () => {
  // passport login
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await userService.findByUsername(username);
          if (!user) {
            return done(null, false);
          }

          const checkPassword = await user.comparePassword(password);

          if (!checkPassword) {
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.use(
    'local-signup',
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        try {
          const user = await userService.findByUsername(username);
          if (user) {
            return done(
              null,
              false,
              req.flash('signupMessage', 'That username is already taken.'),
            );
          }
          const data = {
            username,
            password,
            email: req.body.email,
            hovaten: req.body.hovaten,
            sodienthoai: req.body.sodienthoai,
            idKhoa: req.body.idKhoa,
          };

          const newUser = userService.createUser(data);
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

export default initPassportLocal;
