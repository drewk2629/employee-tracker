const db = require("../db/connection");

function getDepartments() {
  const sql = `SELECT id, name FROM department`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getDepartmentChoices() {
  return db
    .promise()
    .query(`SELECT id, name FROM employee_tracker.department`)
    .then(([rows, fields]) => {
      return (departmentChoices = rows.map((row) => ({
        name: row.name,
        value: row.id,
      })));
    });
}

function createDepartment(department_name) {
  const sql = `INSERT INTO department (name) VALUES (?)`;
  return new Promise((resolve, reject) => {
    db.query(sql, [department_name], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

module.exports = { getDepartments, getDepartmentChoices, createDepartment };