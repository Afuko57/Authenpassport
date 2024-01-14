const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const connection = require('./config/db');
const bcrypt = require('bcrypt');
const userModel = require('./Model/userModel');

const initializePassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (username, password, done) => {
        try {
          const user = await userModel.getUserByEmailOrUsername(username);

          if (!user) {
            console.error("Incorrect email/username.");
            return done(null, false, { message: "Incorrect email/username." });
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) {
            console.error("Incorrect password.");
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "your-secret-key", // Replace with your secret key
      },
      async (jwtPayload, done) => {
        try {
          const user = await userModel.getUserById(jwtPayload.id);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.getUserById(id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
};

module.exports = initializePassport;
