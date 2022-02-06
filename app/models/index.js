const mongoose = require("mongoose");
const dbConfig = require("../config/default.js");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// indexing model
db.todo = require("./todo.js")(mongoose);

module.exports = db;