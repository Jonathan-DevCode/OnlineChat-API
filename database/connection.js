const sequelize = require("sequelize");

const connection = new sequelize("OnlineChat", "root", "Moo$oon!1ligh!!2ton!!2", {
	host: "127.0.0.1",
	dialect: "mysql"
});

module.exports = connection;