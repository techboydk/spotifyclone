const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({
    name: {
        type: String,  // Corrected from 'string' to String
        required: true,
    },
    thumbnail: {
        type: String,  // Corrected from 'string' to String
        required: false,
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,  // Corrected from mongoose.Types.ObjectId to mongoose.Schema.Types.ObjectId
            ref: "song",
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,  // Corrected from mongoose.Types.ObjectId to mongoose.Schema.Types.ObjectId
        ref: "user",
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,  // Corrected from mongoose.Types.ObjectId to mongoose.Schema.Types.ObjectId
            ref: "user",
        }
    ]
});

const PlaylistModel = mongoose.model('Playlist', Playlist);
module.exports = PlaylistModel;
