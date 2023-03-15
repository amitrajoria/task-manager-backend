var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config();
const passport = require("passport");
// const { AuthModel } = require('../models/Auth.model');
const { v4: uuidv4 } = require('uuid');
const { UserModel } = require('../models/User.model');


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "https://taskmanager-backend.onrender.com/auth/google/callback",
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    const {displayName, email} = profile;
    const password = uuidv4();
    const alreadyUser = await UserModel.findOne({email});
    if(alreadyUser)
        return done(null, alreadyUser);
    const user = new UserModel({name: displayName, email, password});
    await user.save();
    return done(null, user);
  }
));

module.exports = {
    passport
}