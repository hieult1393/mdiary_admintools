/**
 * Database config
 */
var config = {
  "port": 6101,

  "mysql_database": {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'platform',
    charset: 'utf8',
    multipleStatements: true
  },

  "mongo_database": {
    user: '',
    database: '',
    password: '',
    host: 'localhost',
    port: 27017,
  },
  "assets": {
    "path": "../public/",
    "url": "http://localhost:3000/"
  },
  "docs": {
    "path": "../apiDoc/",
    "url": "http://localhost:3000/"
  },
  "api_url": 'http://devapimdiary.mimosatek.com/',
  "assets_url": 'http://devapimdiary.mimosatek.com/'
};
module.exports = config;
