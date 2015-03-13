var passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '92879759840-a5pom5rre8d1h9ru7450kfc3a40l39qn.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'pI_oaKOYgYDKYQghzSBwkPbp',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
	// asynchronous verification, for effect...
	process.nextTick(function () {
		// To keep the example simple, the user's Google profile is returned to
		// represent the logged-in user. In a typical application, you would want
		// to associate the Google account with a user record in your database,
		// and return that user instead.
		return done(null, profile);
});
}
));

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(obj, done) {
done(null, obj);
});

module.exports = passport;