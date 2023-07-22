// database.js
const sqlite3 = require("sqlite3").verbose();

const DB_PATH = "./data/mydatabase.db";

const getDbConnection = () => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
};

module.exports = {
    getDbConnection,
};

// backend.js
const dbConnection = require("./database");

let _db;

const init = async () => {
    try {
        _db = await dbConnection.getDbConnection();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const readTeachers = async () => {
    const sql = `SELECT * FROM teacher`; // Corrected the table name to "teacher"
    return new Promise((resolve, reject) => {
        _db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM teacher WHERE id = ?`;
    return new Promise((resolve, reject) => {
        _db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const addTeacher = async (id, name, age) => {
    const sql = `INSERT INTO teacher (id, name, age) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [id, name, age], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const updateTeacher = async (id, name, age) => {
    const sql = `UPDATE teacher SET name = ?, age = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [name, age, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const deleteTeacher = async (id) => {
    const sql = `DELETE FROM teacher WHERE id = ?`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const readStudents = async () => {
    const sql = `SELECT * FROM student`;
    return new Promise((resolve, reject) => {
        _db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const readStudentInfo = async (id) => {
    const sql = `SELECT * FROM student WHERE id = ?`;
    return new Promise((resolve, reject) => {
        _db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const addStudent = async (id, name, age, religion) => {
    const sql = `INSERT INTO student (id, name, age, religion) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [id, name, age, religion], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const updateStudent = async (id, name, age, religion) => {
    const sql = `UPDATE student SET name = ?, age = ?, religion = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [name, age, religion, id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const deleteStudent = async (id) => {
    const sql = `DELETE FROM student WHERE id = ?`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    init,
    readTeachers,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};

