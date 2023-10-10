const activeRooms = [];

exports.initializeSocket = (io) => {
    let onlineClients = 0;

    io.on('connection', socket => {
        onlineClients++;
        io.emit('onlineClients', onlineClients);
        console.log(`User Connected: ${socket.id}, Online Clients: ${onlineClients}`);
        socket.on("sendPlayerName", data => { // data = {playerName, roomNumber} , difficulty will be added soon
            const roomIndex = activeRooms.findIndex(x => x.roomNumber === data.roomNo)
            console.log(roomIndex);
            console.log(data.difficulty);
            if (roomIndex === -1) {
                console.log(`Room No. ${data.roomNo} created`);
                socket.join(data.roomNo);
                activeRooms.push({
                    roomNumber: data.roomNo,
                    players: [data.playerName],
                    sId: [socket.id],
                    difficulty: data.difficulty
                });
            } else {
                const userInRoom = activeRooms[roomIndex].players;
                if (userInRoom.length >= 2) {
                    socket.emit("roomFull", "Room is full. Cannot join.");
                } else {
                    socket.join(data.roomNo);
                    activeRooms[roomIndex].players.push(data.playerName);
                    activeRooms[roomIndex].sId.push(socket.id);
                    socket.to(data.roomNo).emit("receivePlayerName", data);
                }
            }
            console.log(activeRooms);
        });       

        socket.on("disconnect", () => {
            const roomIndex = activeRooms.findIndex(room => room.sId.includes(socket.id));
            if (roomIndex !== -1) {
                const socketIndex = activeRooms[roomIndex].sId.indexOf(socket.id);
                if (socketIndex !== -1) {
                    activeRooms[roomIndex].sId.splice(socketIndex, 1);
                    activeRooms[roomIndex].players.splice(socketIndex, 1);
                }
                if (activeRooms[roomIndex].sId.length === 0) {
                    activeRooms.splice(roomIndex, 1);
                }
                if (activeRooms[roomIndex]) {
                    io.to(activeRooms[roomIndex].roomNumber).emit("roomUpdated", activeRooms[roomIndex]);
                }
            }
            onlineClients--;
            io.emit('onlineClients', onlineClients);
            console.log(`User Disconnected: ${socket.id}, Online Clients: ${onlineClients}`);
        });
    });

    return io;
};

exports.checkRoomExist = (req, res) => {
    const apiRoomCheck = activeRooms.find(room => room.roomNumber === req.query.roomNo);
    console.log(`Room Exist: ${apiRoomCheck ? true : false}`);
    console.log({fetchRoomExist: (apiRoomCheck ? true : false)});
    res.send({fetchRoomExist: (apiRoomCheck ? true : false)});
}