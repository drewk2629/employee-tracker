USE employee_tracker;

INSERT INTO department (name)
    VALUES
    ('booking'),
    ('management'),
    ('bartender'),
    ('lights'),
    ('audio engineer');

INSERT INTO role (title, salary, dept_id)
    VALUES
    ('booking agent', '30000', '1'),
    ('manager', '75000', '2'),
    ('bartender', '30000', '3'),
    ('lighting foh', '45000', '4'),
    ('audio engineer foh', '45000', '5');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('Kris','Sunico',1,null),
    ('Drew','Knoeller',2,1),
    ('Onyx','Knoeller',3,null),
    ('Wes','Good',4,null),
    ('Emily','Jurow',5,1);
