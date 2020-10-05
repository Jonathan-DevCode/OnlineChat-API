const express = require("express");
const router = express.Router();

const Message = require("./Message");

router.get("/message/:data?", (req, res) => {
    let data = req.params.data;
    Message.findAll({ where: {room: data} })
        .then(sMessage => {
            res.send(JSON.stringify(sMessage))
        }).catch((error) => { console.log(error) });
});

router.post("/message", (req, res) => {
    let req_user = req.body.name;
    let req_room = req.body.room;
    let req_message = req.body.message;

    Message.create({
        name: req_user,
        room: req_room,
        message: req_message
    }).catch((error) => { console.log(error)});
});

module.exports = router;