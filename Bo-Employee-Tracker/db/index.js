const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.promise().query("select * from employee");
  }
}

module.exports = new DB(connection);
//??any of the raw sql needs to happen here if I need to make functions

//??use these methods in the other file when I want to use the operations
