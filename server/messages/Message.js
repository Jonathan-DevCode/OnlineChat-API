const sequelize = require("sequelize");
const connection = require("../../database/connection");

const Message = connection.define("message", {
    room: {
        type: sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize.STRING,
        defaultValue: "Anonymous"
    },
    message: {
        type: sequelize.STRING,
        allowNull: false,
        unique: false
    },   
}, { timestamps: false });

Message.removeAttribute('id');
Message.sync({force: false});
module.exports = Message;