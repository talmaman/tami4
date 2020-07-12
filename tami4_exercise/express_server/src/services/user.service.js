const db = require('../db/database');

exports.GetUser = (username) => {
    return new Promise((res, rej) => {
        const sqlQuery = `SELECT * FROM user WHERE username = '${username}'`;
        db.get(sqlQuery, [], (err, user) => {
            if (err) return rej(err);
            return res(user);
        });
    });
};

exports.InsertUser = (user) => {
    return new Promise((res, rej) => {
        const sqlQuery = `INSERT INTO user (username, email, password) VALUES ('${user.username}', '${user.email}', '${user.password}')`;
        db.run(sqlQuery, (sqlErr) => {
            if (sqlErr) return rej(sqlErr);
            return res(user);
        });
    });
};