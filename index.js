const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/song');
const playlistRoutes = require('./routes/playlist');

const User = require('./models/User');



require('dotenv').config();
const app = express();
const port = 8000;

app.use(express.json());

mongoose.connect(`mongodb+srv://admin:${process.env.Mongo_Pass}@cluster0.zjv4u27.mongodb.net/?retryWrites=true&w=majority`).then((x) => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB " + err.message);
})


//passport jwt authentication
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'ThisIsMySecret';
passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findOne({ _id: jwt_payload._id });
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));


//server listener
// authentication routes
app.use('/auth', authRoutes);

//song create and get routes
app.use('/song', songRoutes);

//Create playlists routes
app.use('/playlist', playlistRoutes);

app.listen(port, () => {
    console.log("listening on port " + port);
});