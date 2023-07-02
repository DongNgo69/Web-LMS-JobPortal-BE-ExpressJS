const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel')

passport.use(new GoogleStrategy(
    {
        clientID: '619700397077-mtdnddv38lp5ph4prhl76it5rtjq0hdn.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: '/auth/google/callback',
        scope: ['profile', 'email']
    },
    async function (accessToken, refreshToken, profile, cb){
        let data = profile?._json;
        const user = await User.findOne({email: data.email });
        if (user){
            return cb(null, user)
        } else {
            const newUser = await User.create({
                email: data.email,
                name: data.name,
                user_image: data.picture,
                roles: "user", 
            });
            return await cb(null, newUser);
        }

    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
})
