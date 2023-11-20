const mongoose = require('mongoose');

const Song = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    thumbnail: {
        type: 'string',
        required: false,
    },
    track: {
        type: 'string',
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
});

const SongModel = mongoose.model('Song', Song);
module.exports = SongModel;