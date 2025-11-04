import { Server } from "socket.io";

let connections = {}
let messages = {}
let timeOnline = {}


const connectToSocket = (server) => {
    const io = new Server(server);
    io.on("connection", (socket) => {
        socket.on("join-call", (path) => {
if(connections[path]===undefined){
connections[path].push(socket.id)
}
connections[path].push(socket.id)
timeOnline[socket.id] = new Date();
        })
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })
    })
}

export default connectToSocket;