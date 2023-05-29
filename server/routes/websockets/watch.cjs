const watch = (io, socket) => {
    return () => {
        socket.join("watchers");
        console.debug("User joined room", socket.id);
    }
};

module.exports = watch;