const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userModel = require('../Model/userModel');

const initializePassportJWT = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env, // Replace with your secret key
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
};

module.exports = initializePassportJWT;
