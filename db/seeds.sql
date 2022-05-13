INSERT INTO department (name)
VALUES
  ('booking'),
  ('management'),
  ('audio engineer'),
  ('lighting');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('booking agent', 20000.00, 1),
  ('manager', 70000.00, 2),
  ('audio engineer', 50000.00, 3),
  ('lighting foh', 20000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Kris', 'Sunico', 1, 2),
  ('Drew', 'Knoeller', 2, NULL),
  ('Emily', 'Jurow', 3, NULL),
  ('Wes', 'Good', 4, 2);