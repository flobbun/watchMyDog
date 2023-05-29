const stream = (io, socket) => {
    return (data) => {
        socket.leave("watchers");
        socket.to("watchers").emit("stream", { data, id: socket.id });
    }
};

module.exports = stream;