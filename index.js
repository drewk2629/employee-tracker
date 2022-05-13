const inquirer = require("inquirer");
const db = require("./db/connection");

const {
  getEmployees,
  getEmployeeChoices,
  updateEmployee,
  createEmployee,
} = require("./routes/employee");
const { 
    getRoles,
    getRoleChoices, 
    createRole 
} = require("./routes/role");
const {
  getDepartments,
  getDepartmentChoices,
  createDepartment,
} = require("./routes/department");

const optionsMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "What would you like to do? (Pick an option below)",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
        validate: (optionInput) => {
          if (optionInput) {
            return true;
          } else {
            console.log("Please select one option");
          }
        },
      },
    ])
    .then((answer) => {
      switch (answer.option) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
      }
    });
};

// View all departments
const viewDepartments = async () => {
  const departments = await getDepartments();
  console.table(departments);
  optionsMenu();
};

// Add a department
const addDepartment = async () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Department name required");
          }
        },
      },
    ])
    .then((answer) => {
      try {
        createDepartment(answer.name);
        console.log("success!");
        optionsMenu();
      } catch (error) {
        console.log(error);
      }
    });
};

// View all roles
const viewRoles = async () => {
  const roles = await getRoles();
  console.table(roles);
  optionsMenu();
};

// Add a role
const addRole = async () => {
  const departmentChoices = await getDepartmentChoices();
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
        validate: (titleInput) => {
          if (titleInput) {
            return true;
          } else {
            console.log("Title role required");
          }
        },
      },

      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log("Salary required");
          }
        },
      },
      {
        type: "list",
        name: "departmentID",
        message: "What is the department of this role?",
        choices: departmentChoices,
        validate: (departmentID) => {
          if (departmentID) {
            return true;
          } else {
            console.log("Department required");
          }
        },
      },
    ])
    .then((answer) => {
      try {
        createRole(answer.title, answer.salary, answer.departmentID);
        console.log("success!");
        optionsMenu();
      } catch (error) {
        console.log(error);
      }
    });
};

// View all employees
const viewEmployees = async () => {
  const employees = await getEmployees();
  console.table(employees);
  optionsMenu();
};

// Add an employee
const addEmployee = async () => {
  let roleChoices = await getRoleChoices();
  let managerChoices = await getEmployeeChoices();
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
        validate: (firstNameInput) => {
          if (firstNameInput) {
            return true;
          } else {
            console.log("Please provide the employees first name");
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (lastNameInput) => {
          if (lastNameInput) {
            return true;
          } else {
            console.log("Please provide the employees last name");
          }
        },
      },
      {
        type: "list",
        name: "roleID",
        message: "What is the employee's role?",
        choices: roleChoices,
        validate: (roleID) => {
          if (roleID) {
            return true;
          } else {
            console.log("Please provide the employees role");
          }
        },
      },
      {
        type: "list",
        name: "managerID",
        message: "Who is the manager?",
        choices: managerChoices,
        validate: (managerID) => {
          if (managerID) {
            return true;
          } else {
            console.log("Please provide the employees manager");
          }
        },
      },
    ])
    .then((answer) => {
      try {
        createEmployee(
          answer.firstName,
          answer.lastName,
          answer.roleID,
          answer.managerID
        );
        console.log("success!");
        optionsMenu();
      } catch (error) {
        console.log(error);
      }
    });
};

// Update an employee
const updateEmployeeRole = async () => {
  let employeeChoices = await getEmployeeChoices();
  let roleChoices = await getRoleChoices();
  inquirer
    .prompt([
      {
        type: "list",
        name: "currentEmployeeID",
        message: "Who is the employee you want to update?",
        choices: employeeChoices,
        validate: (currentEmployeeID) => {
          if (currentEmployeeID) {
            return true;
          } else {
            console.log("Select the employee you wish to update");
          }
        },
      },
      {
        type: "list",
        name: "newRole",
        message: "What is their new title?",
        choices: roleChoices,
        validate: (newRole) => {
          if (newRole) {
            return true;
          } else {
            console.log("Please select the employees new role");
          }
        },
      },
    ])
    .then((answer) => {
      try {
        updateEmployee(answer.newRole, answer.currentEmployeeID);
        console.log("success!");
        optionsMenu();
      } catch (error) {
        console.log(error);
      }
    });
};

// create DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  optionsMenu();
});