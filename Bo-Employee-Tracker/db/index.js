const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.promise().query("select * from employee");
  }
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "select role.id, role.title, department.name as department, role.salary from role left join department on role.department_id = department.id;"
      );
  }
  findAllDepartments() {
    return this.connection.promise().query("select * from department")
  }
  addDepartment(name) {
    return this.connection.promise().query('INSERT INTO department SET ?', name)
  }
  addRole(role) {
    return this.connection.promise().query('INSERT INTO role SET ?', role)
  }

}

module.exports = new DB(connection);
//??any of the raw sql needs to happen here if I need to make functions

//??use these methods in the other file when I want to use the operations
