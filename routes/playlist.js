const express = require('express');
const router = express.Router();
const passport = require('passport');
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const Song = require('../models/Song');


//Create a new Playlist
router.post('/create', passport.authenticate("jwt", { session: false }), async (req, res) => {

    const user = req.user;
    const { name, thumbnail, songs } = req.body;

    if (!name || !thumbnail || !songs) {
        return res.status(301).json({ error: "insufficient details." })
    }
    const playlistData = {
        name,
        thumbnail,
        songs,
        owner: user._id,
        collaborators: [],
    }

    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);

});

//Get playlist by id
router.get('/get/playlistId/:playlistId', passport.authenticate("jwt", { session: false }), async (req, res) => {

    const { playlistId } = req.params;
    const playlist = await Playlist.findOne({ _id: playlistId });

    if (!playlist) {
        return res.status(403).json({ error: "Playlist does not exist." })
    }

    return res.status(200).json(playlist);

});

//Get all playlists created by an artist
router.get('/get/artistId/:artistId', passport.authenticate("jwt", { session: false }), async (req, res) => {

    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    const playlists = await Playlist.find({ owner: artistId });

    if (!artist) {
        return res.status(403).json({ error: "There is no artist with this id." })
    }

    if (!playlists) {
        return res.status(403).json({ error: "There is no playlist created by this artist." })
    }

    return res.status(200).json(playlists);

});

//add songs to the playlist
router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    //check if playlist exists
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
        return res.status(304).json({ error: "playlist not found" });
    }
    //check if this playlist owns by currentUser or collaborator
    if (JSON.stringify(currentUser._id) !== JSON.stringify(playlist.owner) && !playlist.collaborators.includes(currentUser._id)) {
        return res.status(404).json({ error: "Not Allowed" });
    }
    //check if song is valid 
    const song = await Song.findOne({ _id: songId });
    if (!song) {
        return res.status(404).json({ error: "Song not found" });
    }

    if (playlist.songs.includes(songId)) {
        return res.status(200).json({ error: "Song already exists" });
    }

    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);

})

module.exports = router;