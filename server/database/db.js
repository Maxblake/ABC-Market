require("dotenv").config();
const pgp = require("pg-promise")();
const config = require("./config").config
const db = pgp(process.env.DATABASE_URL || config.dbUrl)

module.exports = {
  db
};