// your config settings, DATA_URL defined in .envsample file
const path = require("path");
require("dotenv").config();
const { DATABASE_URL } = process.env;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
   
   // connection: DATABASE_URL,
connection:"postgres://ipquksnv:rMN8pElD025eXYYXGq54IoAwJXKVV0c1@jelani.db.elephantsql.com/ipquksnv",
    migrations: {
       directory: path.join(__dirname, "src", "db", "migrations"),
      },

      seeds: {
            directory: path.join(__dirname, "src", "db", "seeds"),
          },




    },

};
