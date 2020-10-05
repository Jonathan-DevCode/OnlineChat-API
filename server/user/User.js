const sequelize = require("sequelize");
const connection = require("../../database/connection");

const User = connection.define("user", {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    room: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false });

User.sync({force: true});
module.exports = User;