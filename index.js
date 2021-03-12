const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

let corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    content: "application/JSON",
    preflightContinue: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const connection = require("./database/connection");
connection
.authenticate()
.then(() => {
    console.log("Connection established");
})
.catch((error) => {
    console.log(error);
});


app.set("view engine", "html"); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


let User = require("./server/user/User");
let user_controller = require("./server/user/user-controller");
let Message = require("./server/messages/Message");
let message_controller = require("./server/messages/message-controller");

app.use("/", user_controller);
app.use("/", message_controller);

app.listen(2222, function (error) {
    if(error) {
		console.log("Error in connection");
	} else {
		console.log("Connected successfully");
	};
});


// Socket.IO

var socket = require('express')();
var http = require('http').createServer(socket);
var io = require('socket.io')(http);


io.on('connection', (socket) => {

    socket.on("join_room", room => {
        socket.join(room);
        console.log("joined");
    });

    socket.on("leave_room", room => {
        socket.leave(room);
        console.log("leave");
    });
  
    socket.on("answer", data => {
        data = JSON.parse(data);
        io.to(data.room).emit("answer", JSON.stringify(data));
    });

});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
