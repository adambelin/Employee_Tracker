const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'employee_tracker_db'
})

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
})

function insertDepartment() {
    const sql = `INSERT INTO department `
}

