const inquirer = require("inquirer");
const { findAllRoles } = require("./db");
const db = require("./db");
const connection = require("./db/connection");
const loadMainPrompts = () => {
  const answers = [
    { name: "View all departments", value: "VIEW_ALL_DEPARTMENTS" },
    { name: "View all roles", value: "VIEW_ALL_ROLES" },
    { name: "View all employees", value: "VIEW_ALL_EMPLOYEES" },
    { name: "Add new department", value: "ADD_NEW_DEPARTMENT" },
    { name: "Add a role", value: "ADD_A_ROLE" },
    { name: "Add an employee", value: "ADD_AN_EMPLOYEE" },
    { name: "Update an employee role", value: "UPDATE_AN_EMPLOYEE_ROLE" },
    { name: "Quit", value: "Quit" },
  ];
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: answers,
      },
    ])
    .then((answer) => {
      const choice = answer.choice;
      switch (choice) {
        case "VIEW_ALL_DEPARTMENTS":
          viewDepartments();
          break;
        case "VIEW_ALL_ROLES":
          viewRoles();
          break;
        case "VIEW_ALL_EMPLOYEES":
          viewEmployees();
          break;
        case "ADD_NEW_DEPARTMENT":
          addDepartment();
          break;
        case "ADD_A_ROLE":
          addNewRole();
          break;
        case "ADD_EMPLOYEE":
          addEmployee();
          break;
        case "Quit":
          quitApp();

          break;
      }
    });
};

const viewDepartments = () => {
  db.findAllDepartments()
    .then(([rows]) => {
      const departments = rows;
      console.table(departments);
      loadMainPrompts();
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewRoles = () => {
  db.findAllRoles()
    .then(([rows]) => {
      const roles = rows;
      console.table(roles);
      loadMainPrompts();
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewEmployees = () => {
  db.findAllEmployees()
    .then(([rows]) => {
      const employees = rows;
      console.table(employees);
      loadMainPrompts();
    })
    .catch((err) => {
      console.log(err);
    });
};
//!!
const addEmployee = () => {
  const roles = [];
  const employees = [];
  connection
    .promise()
    .query("select * from role")
    .then(([rows]) => {
      for (let i = 0; i < rows.length; i++) {
        const role = {
          name: rows[i].title,
          value: rows[i].id,
        };
        roles.push(role);
      }
      return connection.promise().query("select * from employee");
    })
    .then(([rows]) => {
      for (let i = 0; i < rows.length; i++) {
        const employee = {
          name: rows[i].first_name + " " + rows[i].last_name,
          value: rows[i].id,
        };
        employees.push(employee);
      }
      employees.push({ name: "none", value: null });
      return inquirer.prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employees first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employees last name?",
        },
        {
          name: "role_id",
          type: "list",
          message: "What is the employees role?",
          choices: roles,
        },
        {
          name: "manager_id",
          type: "list",
          message: "What is the employees manager?",
          choices: employees,
        },
      ]);
    })
    .then((newEmployee) => {
      return connection
        .promise()
        .query("insert into employee set ?", newEmployee);
    })
    .then(() => {
      console.log("all good");
    })
    .catch();
};

const quitApp = () => {
  console.log("GOODBYE");
  process.exit();
};

const init = () => {
  loadMainPrompts();
};

init();

const addDepartment = () => {
  return inquirer.prompt([{
    name: "name",
    type: "input",
    message: "What is the name of the new Department",
  }]).then((name) => {
    db.addDepartment(name).then(() => {
      loadMainPrompts()
    })
  })
}
const addNewRole = () => {
  return inquirer.prompt([{
    name: "name",
    type: "input",
    message: "What is the name of the new Department",
  }]).then((name) => {
    db.addDepartment(name).then(() => {
      loadMainPrompts()
    })
  })
}

//?? add a case to my switch statement for every option

//?? add a function to handle each case that will use my db class to talk to database

//?? I will have to add methods to my db class to handle new functionality

//?? some of the functions for the cases may require additional inquirer.prompts. You may have to combine database queries with inquirer questions to correctly fill out data

//??

//??

//??
