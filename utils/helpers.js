const jwt = require('jsonwebtoken');

exports = {}

exports.getToken = async (email, user) => {
    const token = await jwt.sign({ _id: user._id }, "ThisIsMySecret");
    return token;
}

module.exports = exports;