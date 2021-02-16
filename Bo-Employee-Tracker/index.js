const inquirer = require("inquirer");
const db = require("./db");

const loadMainPrompts = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          { name: "View all departments", value: "VIEW_ALL_DEPARTMENTS" },
          { name: "View all roles", value: "VIEW_ALL_ROLES" },
          { name: "View all employees", value: "VIEW_ALL_EMPLOYEES" },
          { name: "Add new department", value: "ADD_NEW_DEPARTMENT" },
          { name: "Add a role", value: "ADD_A_ROLE" },
          { name: "Add an employee", value: "ADD_AN_EMPLOYEE" },
          { name: "Update an employee role", value: "UPDATE_AN_EMPLOYEE_ROLE" },
        ],
      },
    ])
    .then((answer) => {
      const choice = answer.choice;
      switch (choice) {
        case "VIEW_ALL_DEPARTMENTS":
          viewEmployees();
          break;
      }
    });
};

const viewEmployees = () => {
  db.findAllEmployees()
    .then(([rows]) => {
      const employees = rows;
      console.table(employees);
    })
    .then(() => {
      loadMainPrompts();
    });
};

const init = () => {
  loadMainPrompts();
};

init();

//?? add a quit option

//?? add a case to my switch statement for every option

//?? add a function to handle each case that will use my db class to talk to database

//?? I will have to add methods to my db class to handle new functionality

//?? some of the functions for the cases may require additional inquirer.prompts. You may have to combine database queries with inquirer questions to correctly fill out data

//??

//??

//??
