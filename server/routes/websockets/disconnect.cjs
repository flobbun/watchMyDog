const disconnect = (io, socket) => {
    return () => {
        io.sockets.emit("userDisconnected", {
            numberOfUsers: io.engine.clientsCount,
        });
        console.debug("User disconnected", socket.id, io.engine.clientsCount);
    }
};

module.exports = disconnect;