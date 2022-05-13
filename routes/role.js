const db = require("../db/connection");

function getRoles() {
  const sql = `
  SELECT
    roles.id, 
    roles.title, 
    roles.salary, 
    department.name AS "department"
  FROM roles
  LEFT JOIN department
    ON department.id = roles.department_id`;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getRoleChoices() {
  return db
    .promise()
    .query(`SELECT id, title FROM employee_tracker.roles;`)
    .then(([rows, fields]) => {
      return (roleChoices = rows.map((row) => ({
        name: row.title,
        value: row.id,
      })));
    });
}

function createRole(title, salary, department_id) {
  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [title, salary, department_id], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

module.exports = { getRoles, getRoleChoices, createRole };