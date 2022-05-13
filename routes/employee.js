const db = require("../db/connection");

function getEmployees() {
  const sql = `
  SELECT 
      employee.id, 
      employee.first_name AS "first name", 
      employee.last_name AS "last name", 
      roles.title, 
      department.name AS "department", 
      roles.salary AS "salary",
      CONCAT(manager.first_name, " ", manager.last_name) AS "manager"
  FROM employee
  LEFT JOIN roles
      ON roles.id = employee.role_id
  LEFT JOIN department
      ON department.id = roles.department_id
  LEFT JOIN employee manager
      ON manager.id = employee.manager_id
  ORDER BY employee.id`;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getEmployeeChoices() {
  return db
    .promise()
    .query(
      `SELECT id, concat(first_name, " ", last_name) AS name FROM employee_tracker.employee;`
    )
    .then(([rows, fields]) => {
      return (employeeChoices = rows.map((row) => ({
        name: row.name,
        value: row.id,
      })));
    });
}

function updateEmployee(role, employeeId) {
  const sql = `UPDATE employee SET role_id = ? WHERE employee.id =?`;
  return new Promise((resolve, reject) => {
    db.query(sql, [role, employeeId], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function createEmployee(firstName, lastName, roleId, managerId) {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [firstName, lastName, roleId, managerId], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

module.exports = {
  getEmployees,
  getEmployeeChoices,
  updateEmployee,
  createEmployee,
};