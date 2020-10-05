const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("./User");

router.get("/", (req, res) => {
    User.findAll({raw: true, order: [["id", "DESC"]] })
        .then((sUser) => {
            res.send(JSON.stringify(sUser));
        })
});

router.post("/", (req, res) => {
    let req_user = req.body.name;
    let req_room = req.body.room;
    let req_password = req.body.password;

    let test = [];
    test.push( req_user, req_room );
    
    let state;
    test.forEach(element => {
        if ( element == "" || element == undefined) {
            state = 1;
        }
    });

    if ( state == undefined ) {
        User.findOne({where: {name: req_user} })
            .then((sUser) => {
                if (sUser != null) {
                    res.send("1");
                } else {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(req_password, salt);
            
                    User.create({
                        name: req_user,
                        room: req_room,
                        password: hash
                    }).then(
                        res.send("2")
                    ).catch(
                        (error) => {console.log(error)}
                    );
                };
            });

    } else {
        res.send("")
    }
});

router.post("/user", (req, res) => {
    let req_name = req.body.name;
    let req_password = req.body.password;

    User.findOne( {where: {name: req_name}})
        .then(server_user => {
           
            if (server_user) {
                let valid_pw = bcrypt.compareSync(req_password, server_user.password);
                
                if (valid_pw) {
                    res.send(server_user);
                } else {
                    res.send("2");
                }
            } else { res.send("3")};
        }).catch((error) => {
            res.send("4");
            console.log(error);
        })
});

router.delete("/:data", (req, res) => {
    let data = req.params.data;
    User.destroy({where: {id: data }} )
        .then( () => {
            res.send("1");
        }).catch((error) => {
            console.log(error);
        })
});

module.exports = router;