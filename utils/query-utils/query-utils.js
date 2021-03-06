const questions = require('../../utils/questions')
const cTable = require('console.table');
const inquirer = require('inquirer');

function queryDepartments(db) {

    const sql = `SELECT * FROM department`

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        return questions();
    });
};

function queryRoles(db) {

    const sql = 'SELECT * FROM role ORDER BY department_id';

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        return questions();
    });
}

function queryEmployees(db) {
    const sql = `SELECT * FROM employee
                LEFT JOIN role
                ON employee.role_id = role.id`

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.table(rows);
        // console.log(typeof questions)
        return questions()
    });
}

function createDepartment(db, answers) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [
        answers.addDepartment
    ];

    db.query(sql, params, (err, result) => {
        if (err) throw err;

        console.log(`you have added ${answers.addDepartment} to the departments`);
        return questions();
    });
}

function createRole(db, answers) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
    const params = [
        answers.addRole,
        answers.roleSalary,
        answers.roleDepartment
    ];

    db.query(sql, params, (err, result) => {
        if (err) throw err;

        console.log(`${answers.addRole} role created`)
        return questions();
    })
}

function createEmployee(db, answers) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
                VALUES (?, ?, ?)`

    const params = [
        answers.employeeFirstName,
        answers.employeeLastName,
        answers.employeeRole,
    ];

    db.query(sql, params, (err, result) => {
        if (err) throw err;

        console.log(`${answers.employeeFirstName} ${answers.employeeLastName} added to the employee list`);
        return questions();
    });
}

function getEmployeeList(db) {
    const sql = `SELECT first_name, last_name FROM employee`

    db.query(sql, (err, rows) => {
        if (err) throw err;
        let employeeChoices = rows.map(employee => {
            return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
        });
        inquirer
            .prompt([
                {
                    name: 'employeeList',
                    type: 'list',
                    message: 'Which employee\'s role would you like to update?',
                    choices: employeeChoices
                }
            ])
            .then(answers => {
                JSON.stringify(console.log(answers));
            })
    })
}

function updateEmployee(db, answers) {

}

module.exports.createRole = createRole;
module.exports.queryDepartments = queryDepartments;
module.exports.queryRoles = queryRoles;
module.exports.queryEmployees = queryEmployees;
module.exports.createDepartment = createDepartment;
module.exports.createEmployee = createEmployee;
module.exports.updateEmployee = updateEmployee;
module.exports.getEmployeeList = getEmployeeList;

