const action = (io, socket) => {
    return (action) => {
        socket.broadcast.emit("action", action);
    }
};

module.exports = action;