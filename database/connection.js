const sequelize = require("sequelize");

const connection = new sequelize("*", "*", "*", {
	host: ""*"",
	dialect: "mysql"
});

module.exports = connection;
