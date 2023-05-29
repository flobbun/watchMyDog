const authHelper = require("../helpers/auth.cjs");

const socketAuth = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (authHelper.verifyToken(token)) {
        next();
    } else {
        next(new Error("Authentication error"));
        socket.disconnect(true);
    }
}

module.exports = socketAuth;